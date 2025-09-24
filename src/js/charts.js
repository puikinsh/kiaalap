/* Kiaalap Dashboard - Charts Initialization */

document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Chart.js default configuration
    Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    Chart.defaults.color = '#6b7280';
    Chart.defaults.plugins.legend.display = true;
    Chart.defaults.plugins.legend.position = 'bottom';

    // ========================================
    // UNIVERSITY EARNINGS CHART
    // ========================================
    const earningsCtx = document.getElementById('earningsChart');
    if (earningsCtx) {
        earningsCtx.height = 300; // Set fixed height
        new Chart(earningsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'CSE',
                    data: [30, 45, 40, 50, 55, 60, 65, 70, 68, 75, 80, 85],
                    borderColor: '#006DF0',
                    backgroundColor: 'rgba(0, 109, 240, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Accounting',
                    data: [20, 30, 35, 30, 40, 45, 50, 55, 52, 58, 60, 65],
                    borderColor: '#933EC5',
                    backgroundColor: 'rgba(147, 62, 197, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Electrical',
                    data: [15, 20, 25, 28, 30, 35, 38, 40, 42, 45, 48, 50],
                    borderColor: '#65b12d',
                    backgroundColor: 'rgba(101, 177, 45, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': $';
                                }
                                label += context.parsed.y + 'k';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [5, 5],
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + value + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // ========================================
    // ADMISSION STATISTICS CHART
    // ========================================
    const admissionCtx = document.getElementById('admissionChart');
    if (admissionCtx) {
        admissionCtx.height = 300; // Set fixed height
        new Chart(admissionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Python',
                    data: [65, 70, 75, 81, 85, 88, 90, 92, 88, 85, 82, 80],
                    backgroundColor: '#006DF0',
                    borderRadius: 4,
                    barThickness: 20
                }, {
                    label: 'PHP',
                    data: [45, 48, 50, 52, 55, 58, 60, 62, 58, 55, 52, 50],
                    backgroundColor: '#933EC5',
                    borderRadius: 4,
                    barThickness: 20
                }, {
                    label: 'Java',
                    data: [55, 58, 60, 62, 65, 68, 70, 72, 68, 65, 62, 60],
                    backgroundColor: '#65b12d',
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y + ' students';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [5, 5],
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    // ========================================
    // SPARKLINE CHARTS
    // ========================================

    // Visits Sparkline
    const visitsSparklineCtx = document.getElementById('visitsSparkline');
    if (visitsSparklineCtx) {
        new Chart(visitsSparklineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array.from({length: 7}, (_, i) => ''),
                datasets: [{
                    data: [45, 52, 48, 65, 58, 72, 68],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }

    // Page Views Sparkline
    const pageViewsSparklineCtx = document.getElementById('pageViewsSparkline');
    if (pageViewsSparklineCtx) {
        new Chart(pageViewsSparklineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array.from({length: 7}, (_, i) => ''),
                datasets: [{
                    data: [30, 35, 40, 38, 45, 50, 48],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }

    // Bounce Rate Sparkline
    const bounceRateSparklineCtx = document.getElementById('bounceRateSparkline');
    if (bounceRateSparklineCtx) {
        new Chart(bounceRateSparklineCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: Array.from({length: 7}, (_, i) => ''),
                datasets: [{
                    data: [25, 22, 20, 18, 19, 17, 18],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        reverse: true // Lower bounce rate is better
                    }
                }
            }
        });
    }

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Animate all counters on page load
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        if (!isNaN(target)) {
            animateCounter(counter, target);
        }
    });

    // ========================================
    // DYNAMIC TIME UPDATES
    // ========================================
    function updateRelativeTimes() {
        const timeElements = document.querySelectorAll('[data-time]');
        timeElements.forEach(element => {
            const timestamp = element.dataset.time;
            // Update relative time display
            // This would normally calculate relative time from timestamp
        });
    }

    // Update times every minute
    setInterval(updateRelativeTimes, 60000);

    // ========================================
    // CHART RESIZE HANDLER
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Charts will automatically resize
            Chart.helpers.each(Chart.instances, function(instance) {
                instance.resize();
            });
        }, 250);
    });

    // ========================================
    // PROGRESS BAR ANIMATIONS
    // ========================================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.1 });

        progressBars.forEach(progressBar => {
            observer.observe(progressBar);
        });
    }

    // Initialize progress bar animations
    animateProgressBars();

    // ========================================
    // REFRESH DATA (MOCK)
    // ========================================
    document.querySelectorAll('[data-refresh]').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            if (card) {
                // Add loading state
                card.style.opacity = '0.6';

                // Simulate data refresh
                setTimeout(() => {
                    card.style.opacity = '1';
                    // Here you would update the chart data
                }, 1000);
            }
        });
    });

    // ========================================
    // EXPORT FUNCTIONALITY
    // ========================================
    document.querySelectorAll('[data-export]').forEach(button => {
        button.addEventListener('click', function() {
            const format = this.dataset.export;
            console.log(`Exporting data in ${format} format...`);
            // Implement actual export logic here
        });
    });
});