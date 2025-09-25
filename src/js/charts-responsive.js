/* Kiaalap Dashboard - Responsive Charts */

document.addEventListener('DOMContentLoaded', function () {
  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded');
    return;
  }

  // Chart.js default configuration
  Chart.defaults.font.family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  Chart.defaults.color = '#6b7280';
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;

  // ========================================
  // UNIVERSITY EARNINGS CHART
  // ========================================
  const earningsCtx = document.getElementById('earningsChart');
  if (earningsCtx) {
    new Chart(earningsCtx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'CSE',
            data: [30, 45, 40, 50, 55, 60, 65, 70, 68, 75, 80, 85],
            borderColor: '#006DF0',
            backgroundColor: 'rgba(0, 109, 240, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: 'Accounting',
            data: [20, 30, 35, 30, 40, 45, 50, 55, 52, 58, 60, 65],
            borderColor: '#933EC5',
            backgroundColor: 'rgba(147, 62, 197, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: 'Electrical',
            data: [15, 20, 25, 28, 30, 35, 38, 40, 42, 45, 48, 50],
            borderColor: '#65b12d',
            backgroundColor: 'rgba(101, 177, 45, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': $';
                }
                label += context.parsed.y + 'k';
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [5, 5],
              color: 'rgba(0,0,0,0.05)',
            },
            ticks: {
              callback: function (value) {
                return '$' + value + 'k';
              },
            },
          },
        },
      },
    });
  }

  // ========================================
  // ADMISSION STATISTICS CHART
  // ========================================
  const admissionCtx = document.getElementById('admissionChart');
  if (admissionCtx) {
    new Chart(admissionCtx, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Python',
            data: [65, 70, 75, 81, 85, 88, 90, 92, 88, 85, 82, 80],
            backgroundColor: '#006DF0',
            borderRadius: 4,
          },
          {
            label: 'PHP',
            data: [45, 48, 50, 52, 55, 58, 60, 62, 58, 55, 52, 50],
            backgroundColor: '#933EC5',
            borderRadius: 4,
          },
          {
            label: 'Java',
            data: [55, 58, 60, 62, 65, 68, 70, 72, 68, 65, 62, 60],
            backgroundColor: '#65b12d',
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y + ' students';
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [5, 5],
              color: 'rgba(0,0,0,0.05)',
            },
          },
        },
      },
    });
  }

  // ========================================
  // SPARKLINE CHARTS
  // ========================================

  // Visits Sparkline
  const visitsSparklineCtx = document.getElementById('visitsSparkline');
  if (visitsSparklineCtx) {
    new Chart(visitsSparklineCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [45, 52, 48, 65, 58, 72, 68],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Page Views Sparkline
  const pageViewsSparklineCtx = document.getElementById('pageViewsSparkline');
  if (pageViewsSparklineCtx) {
    new Chart(pageViewsSparklineCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [30, 35, 40, 38, 45, 50, 48],
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Bounce Rate Sparkline
  const bounceRateSparklineCtx = document.getElementById('bounceRateSparkline');
  if (bounceRateSparklineCtx) {
    new Chart(bounceRateSparklineCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [25, 22, 20, 18, 19, 17, 18],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            reverse: true,
            beginAtZero: false,
          },
        },
      },
    });
  }

  // ========================================
  // ENSURE CHARTS RESIZE PROPERLY
  // ========================================
  window.addEventListener('resize', function () {
    // All charts will automatically resize due to responsive: true
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.resize();
    });
  });

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
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/,/g, ''));
    if (!isNaN(target)) {
      animateCounter(counter, target);
    }
  });
});
