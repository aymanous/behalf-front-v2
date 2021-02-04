<figure class="highcharts-figure">
    <div id="inputChart"></div>
</figure>
<script>
    function initInputChart() {
        resetInputChart();

        var chartDiv = document.createElement('div');
        chartDiv.className = 'chart';
        document.getElementById('inputChart').appendChild(chartDiv);

        let time = input.headers[0];

        let sensor = input.headers[1];
        let parameter = getSensorParameter(sensor);

        input.chart = Highcharts.chart(chartDiv, {

            chart: {
                scrollablePlotArea: {
                    minWidth: 700
                },
                spacingBottom: 50,
                zoomType: 'x',
            },

            title: {
                text: parameter.label,
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
                categories: $(input.values).map(function() {
                    return parseFloat(this[time]);
                }).get()
            },

            yAxis: chart_config.yAxis,

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

            credits: {
                enabled: false
            },

            legend: chart_config.legend,
            lang: chart_config.lang,
            exporting: _getChartExporting("input_" + parameter.key),
            tooltip: _getChartTooltip(" " + parameter.unit),

            series: [{
                data: $(input.values).map(function() {
                    return parseFloat(this[sensor]);
                }).get(),
                name: parameter.sensor,
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
            let obj = {};
            obj[input.headers[0]] = input.chart.axes[0].categories[i];
            obj[input.headers[1]] = this.options.y;
            return obj;
        }).get();
    }

    function updateInputChart() {
        initInputChart();
    }

    function updateSingleInputChartValue(row, value) {
        input.chart.series[0].data[row].update(value);
    }

    function resetInputChart() {
        $("#inputChart").empty();
    }
</script>