<script>
import { onMount, onDestroy } from 'svelte';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export let animalData = [];
export let zookeeperData = [];

let canvas;
let chart;

function parseDate(dateStr) {
    // Convert DD.MM.YYYY to YYYY-MM-DD for proper sorting
    if (dateStr.includes('.')) {
        const [day, month, year] = dateStr.split('.');
        return `${year}-${month}-${day}`;
    }
    return dateStr;
}

function formatDate(dateStr) {
    try {
        // Handle both formats: YYYY-MM-DD and DD.MM.YYYY
        const date = dateStr.includes('.') ? 
            parseDate(dateStr) : dateStr;
        
        const [year, month, day] = date.split('-');
        if (!year || !month || !day) return 'Invalid Date';
        
        return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
    } catch (e) {
        console.error('Date formatting error:', e);
        return 'Invalid Date';
    }
}

// Process timeline data
$: {
    if (chart && animalData && zookeeperData) {
        try {
            // Collect and parse all dates
            const dates = [...new Set([
                ...animalData.map(a => parseDate(a.arrival_date)),
                ...zookeeperData.map(z => parseDate(z.hire_date))
            ])].filter(date => date && date !== 'Invalid Date')
              .sort((a, b) => new Date(a) - new Date(b));

            const timelineData = dates.map(date => {
                const animalCount = animalData.filter(a => {
                    const arrivalDate = parseDate(a.arrival_date);
                    return arrivalDate && new Date(arrivalDate) <= new Date(date);
                }).length;

                const zookeeperCount = zookeeperData.filter(z => {
                    const hireDate = parseDate(z.hire_date);
                    return hireDate && new Date(hireDate) <= new Date(date);
                }).length;

                return { date, animalCount, zookeeperCount };
            });

            chart.data.labels = timelineData.map(d => formatDate(d.date));
            chart.data.datasets[0].data = timelineData.map(d => d.animalCount);
            chart.data.datasets[1].data = timelineData.map(d => d.zookeeperCount);
            chart.update();
        } catch (e) {
            console.error('Error processing timeline data:', e);
        }
    }
}

onMount(() => {
    const ctx = canvas.getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Animals',
                    data: [],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Zookeepers',
                    data: [],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Zoo Growth Timeline',
                    font: {
                        size: 16,
                        weight: 'normal'
                    },
                    padding: 20
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    displayColors: true,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        font: {
                            size: 11
                        },
                        callback: function(value, index, values) {
                            // Show fewer x-axis labels
                            if (index === 0 || index === values.length - 1 || index % Math.ceil(values.length / 5) === 0) {
                                return this.getLabelForValue(value);
                            }
                            return '';
                        }
                    },
                    title: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        },
                        padding: 8,
                        stepSize: 1
                    },
                    title: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                line: {
                    borderJoinStyle: 'round'
                }
            }
        }
    });
});

onDestroy(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
.chart-container {
    position: relative;
    height: 300px;
    width: 100%;
    padding: 10px;
}
</style> 