<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhD Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>PhD Dashboard</h1>
            <p class="subtitle">Track progress, manage work, and keep everything in one place.</p>
        </header>

        <div class="dashboard-grid">
            <div class="left-column">
                <section class="card">
                    <h2>PhD Progress Tracker</h2>
                    <div class="progress-overview">
                        <div class="progress-item">
                            <span class="progress-label">Requirements Completed</span>
                            <span class="progress-value" id="requirements-count">0/0</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">ECTS Completed</span>
                            <span class="progress-value" id="ects-count">0/0</span>
                        </div>
                    </div>
                </section>

                <section class="card">
                    <h2>PhD Requirements</h2>
                    <div class="requirements-list" id="requirements-list"></div>
                </section>

                <section class="card chart-card">
                    <h2>Progress Overview</h2>
                    <div class="chart-container">
                        <canvas id="progressChart"></canvas>
                        <div class="chart-center">
                            <span class="chart-total" id="chart-total">180</span>
                            <span class="chart-label">Total ECTS</span>
                        </div>
                    </div>
                    <div class="chart-legend" id="chart-legend"></div>
                </section>
            </div>

            <div class="right-column">
                <section class="card">
                    <h2>Ongoing Projects</h2>
                    <ul class="project-list">
                        <li class="project-item"><span class="project-icon">🔬</span><span>EMA 1</span></li>
                        <li class="project-item"><span class="project-icon">📊</span><span>Meta Analysis</span></li>
                        <li class="project-item"><span class="project-icon">💡</span><span>Essays</span></li>
                    </ul>
                </section>

                <section class="card">
                    <h2>Resources & Useful Links</h2>
                    <p class="resources-intro">Save papers, tools, datasets, courses, and websites here.</p>
                    <div class="resources-tabs">
                        <button class="tab-btn active">Gallery</button>
                        <button class="tab-btn">Table</button>
                    </div>
                    <div class="resource-placeholder"><span>+ New page</span></div>
                </section>

                <section class="card">
                    <h2>Mini Week Planner</h2>
                    <table class="week-planner">
                        <thead>
                            <tr><th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th></tr>
                        </thead>
                        <tbody>
                            <tr><td class="time-slot">AM</td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
                            <tr><td class="time-slot">PM</td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
