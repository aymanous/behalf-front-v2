<figure class="highcharts-figure">
    <div id="inputChart"></div>
</figure>
<script>
    function initInputChart(data) {
        resetInputChart();

        var chartDiv = document.createElement('div');
        chartDiv.className = 'chart';
        document.getElementById('inputChart').appendChild(chartDiv);

        input.chart = Highcharts.chart(chartDiv, {

            chart: {
                scrollablePlotArea: {
                    minWidth: 700
                },
                spacingBottom: 50,
                zoomType: 'x',
            },

            title: {
                text: "Débit",
                align: 'left',
                margin: 0,
            },

            subtitle: {
                text: ""
            },

            xAxis: {
                crosshair: true,
                events: {
                    setExtremes: syncExtremes
                },
                categories: $(data).map(function() {
                    return this.time;
                }).get()
            },

            yAxis: [{
                title: {
                    text: null
                },
                labels: {
                    align: 'left',
                    x: 3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }, { // right y axis
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {
                    text: null
                },
                labels: {
                    align: 'right',
                    x: -10,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],

            legend: {
                layout: 'horizontal',
                align: 'right',
                x: -100,
                verticalAlign: 'top',
                y: 40,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },

            tooltip: {
                shared: true,
                positioner: function() {
                    return {
                        // right aligned
                        x: this.chart.chartWidth - this.label.width - 50,
                        y: 0 // align to title
                    };
                },
                borderWidth: 0,
                backgroundColor: 'none',
                pointFormat: '{point.y}',
                headerFormat: '',
                shadow: false,
                style: {
                    fontSize: '18px'
                },
            },

            plotOptions: {
                series: {
                    stickyTracking: false,
                    dragDrop: {
                        draggableY: true
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(e) {
                                hs.htmlExpand(null, {
                                    pageOrigin: {
                                        x: e.pageX || e.clientX,
                                        y: e.pageY || e.clientY
                                    },
                                    headingText: this.series.name,
                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + ' sessions',
                                    width: 200
                                });
                            },
                            drop: function(e) {
                                updateInputData(getInputChartData(), "chart");
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                },
                column: {
                    stacking: 'normal',
                    minPointLength: 2
                },
                line: {
                    cursor: 'ns-resize'
                }
            },

            exporting: {
                buttons: {
                    contextButton: {
                        align: 'right',
                        x: -10,
                        y: -5,
                    }
                }
            },

            series: [{
                data: $(data).map(function() {
                    return this.debit;
                }).get(),
                name: "Débit",
                type: "line",
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                lineWidth: 1,
                marker: {
                    radius: 4
                },
            }]
        });
    }

    function getInputChartData() {
        return $(input.chart.series[0].data).map(function(i) {
            return {
                time: input.chart.axes[0].categories[i],
                value: this.options.y
            };
        }).get();
    }

    function updateInputChart(data) {
        initInputChart(data);
    }

    function resetInputChart() {
        $("#inputChart").empty();
    }
</script>