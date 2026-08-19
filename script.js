const categoryColors = {
    'Research': '#a78bfa',
    'Coursework': '#60a5fa',
    'Publications': '#34d399',
    'Thesis': '#fbbf24'
};

let requirements = [];
let chart = null;

async function init() {
    await loadData();
    renderRequirements();
    updateProgress();
    initChart();
}

async function loadData() {
    try {
        const response = await fetch('requirements.json');
        const data = await response.json();
        requirements = data.requirements;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderRequirements() {
    const container = document.getElementById('requirements-list');
    container.innerHTML = '';
    
    requirements.forEach((req, index) => {
        const item = document.createElement('div');
        item.className = 'requirement-item';
        
        const checkbox = document.createElement('div');
        checkbox.className = `requirement-checkbox ${req.completed ? 'checked' : ''}`;
        checkbox.onclick = () => toggleRequirement(index);
        
        const content = document.createElement('div');
        content.className = 'requirement-content';
        
        const header = document.createElement('div');
        header.className = 'requirement-header';
        
        const name = document.createElement('span');
        name.className = 'requirement-name';
        name.textContent = req.name;
        
        const ects = document.createElement('span');
        ects.className = 'requirement-ects';
        ects.textContent = req.ects > 0 ? `${req.ects} ECTS` : '';
        
        header.appendChild(name);
        header.appendChild(ects);
        
        const meta = document.createElement('div');
        meta.className = 'requirement-meta';
        
        const category = document.createElement('span');
        category.className = 'requirement-category';
        category.style.backgroundColor = categoryColors[req.category] + '20';
        category.style.color = categoryColors[req.category];
        category.textContent = req.category;
        
        const deadline = document.createElement('span');
        deadline.textContent = req.deadline ? `Due: ${formatDate(req.deadline)}` : 'No deadline';
        
        meta.appendChild(category);
        meta.appendChild(deadline);
        
        content.appendChild(header);
        content.appendChild(meta);
        
        if (req.notes) {
            const notes = document.createElement('div');
            notes.className = 'requirement-notes';
            notes.textContent = req.notes;
            content.appendChild(notes);
        }
        
        item.appendChild(checkbox);
        item.appendChild(content);
        container.appendChild(item);
    });
}

function toggleRequirement(index) {
    requirements[index].completed = !requirements[index].completed;
    renderRequirements();
    updateProgress();
    updateChart();
}

function updateProgress() {
    const completedCount = requirements.filter(r => r.completed).length;
    const totalCount = requirements.length;
    const completedECTS = requirements.filter(r => r.completed).reduce((sum, r) => sum + r.ects, 0);
    const totalECTS = requirements.reduce((sum, r) => sum + r.ects, 0);
    
    document.getElementById('requirements-count').textContent = `${completedCount}/${totalCount}`;
    document.getElementById('ects-count').textContent = `${completedECTS}/${totalECTS}`;
    document.getElementById('chart-total').textContent = totalECTS;
}

function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const { completedECTS, remainingECTS } = getChartData();
    
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data: [completedECTS, remainingECTS],
                backgroundColor: ['#a78bfa', '#e2e8f0'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return `${context.label}: ${context.raw} ECTS (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    updateLegend();
}

function getChartData() {
    const completedECTS = requirements.filter(r => r.completed).reduce((sum, r) => sum + r.ects, 0);
    const totalECTS = requirements.reduce((sum, r) => sum + r.ects, 0);
    const remainingECTS = totalECTS - completedECTS;
    return { completedECTS, remainingECTS };
}

function updateChart() {
    if (!chart) return;
    const { completedECTS, remainingECTS } = getChartData();
    chart.data.datasets[0].data = [completedECTS, remainingECTS];
    chart.update();
    updateLegend();
}

function updateLegend() {
    const legend = document.getElementById('chart-legend');
    const { completedECTS, remainingECTS } = getChartData();
    const total = completedECTS + remainingECTS;
    
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background-color: #a78bfa;"></div>
            <span>Completed: ${completedECTS} (${((completedECTS/total)*100).toFixed(1)}%)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #e2e8f0;"></div>
            <span>Remaining: ${remainingECTS} (${((remainingECTS/total)*100).toFixed(1)}%)</span>
        </div>
    `;
}

function formatDate(dateStr) {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
}


function initTaskList() {
    loadTasks();
    renderTasks();
}

let tasks = [];

function loadTasks() {
    const saved = localStorage.getItem('taskList');
    tasks = saved ? JSON.parse(saved) : [
        { text: 'Review literature', completed: false },
        { text: 'Draft methodology', completed: false },
        { text: 'Data collection', completed: false }
    ];
}

function saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(tasks));
}

function renderTasks() {
    const container = document.getElementById('task-list');
    if (!container) return;
    container.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const item = document.createElement('li');
        item.className = 'task-item' + (task.completed ? ' completed' : '');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-check';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(index);
        
        const text = document.createElement('span');
        text.className = 'task-text';
        text.contentEditable = true;
        text.textContent = task.text;
        text.onblur = () => updateTaskText(index, text.textContent);
        
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.innerHTML = '&times;';
        delBtn.title = 'Delete';
        delBtn.onclick = () => deleteTask(index);
        
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(delBtn);
        container.appendChild(item);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function updateTaskText(index, newText) {
    tasks[index].text = newText.trim() || tasks[index].text;
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function addNewTask() {
    tasks.push({ text: 'New task', completed: false });
    saveTasks();
    renderTasks();
    // Focus the new task's text for immediate editing
    const items = document.querySelectorAll('.task-text');
    if (items.length > 0) {
        items[items.length - 1].focus();
    }
}
init();
