<script src="assets/libraries/highcharts/highcharts.js"></script>
<script src="assets/libraries/highcharts/draggable-points.js"></script>
<script src="assets/libraries/highcharts/data.js"></script>
<script src="assets/libraries/highcharts/series-label.js"></script>
<script src="assets/libraries/highcharts/exporting.js"></script>
<script src="assets/libraries/highcharts/export-data.js"></script>
<script src="assets/libraries/highcharts/accessibility.js"></script>

<script src="assets/libraries/highcharts/highslide-full.min.js"></script>
<script src="assets/libraries/highcharts/highslide.config.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="assets/libraries/highcharts/highslide.css" />

<figure class="highcharts-figure">
    <div id="container"></div>
</figure>
<script>
    function initInputChart(data) {

        Highcharts.chart('container', {

            chart: {
                scrollablePlotArea: {
                    minWidth: 700
                },
                zoomType: 'x',
            },

            title: {
                text: "Evolution du débit d'une vanne en fonction du temps"
            },

            subtitle: {
                text: ""
            },

            xAxis: {
                categories: $(data).map(function() {
                    return this.time;
                }).get()
            },

            yAxis: [{ // left y axis
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
                    x: -3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],

            legend: {
                align: 'left',
                verticalAlign: 'top',
                borderWidth: 0
            },

            tooltip: {
                shared: true,
                crosshairs: true
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

            series: [{
                name: "Débit",
                lineWidth: 1,
                marker: {
                    radius: 4
                },
                data: $(data).map(function() {
                    return this.debit;
                }).get()

            }]
        });
    }
</script>