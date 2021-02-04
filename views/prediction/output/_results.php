<div class="header">
    <div class="row">
        <div class="col-lg-3">
            <h4>Résultats</h4>
        </div>
        <div class="col-lg-9 text-right">
            <button class="gray" data-toggle="modal" data-target="#model-modal">
                <i class="fa fa-project-diagram"></i><span>Système fluidique étudié</span>
            </button>
            <button class="gray" data-toggle="modal" data-target="#logs-modal">
                <i class="fa fa-list-ul"></i><span>Logs</span>
            </button>
            <button class="green" onclick="launchPrediction()">
                <i class="fa fa-redo-alt"></i><span>Relancer</span>
            </button>
        </div>
    </div>
</div>

<div class="modal fade" id="model-modal" tabindex="-1" role="dialog" aria-labelledby="model-modal" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 950px; margin: 1em auto;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-blue">Système fluidique étudié</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img src="data/assets/model_fluidic_circuit.png" alt="" style="width: 100%;">
            </div>
        </div>
    </div>
</div>

<figure class="highcharts-figure">
    <div id="outputCharts"></div>
</figure>

<script>
    function initResultsData(data) {
        let color = 1;
        let datasets = [];
        $.each(data.headers, function(_, header) {

            let parameter = getSensorParameter(header);

            let indice = null;
            $.each(datasets, function(i, dataset) {
                if (dataset.parameter === parameter.key) {
                    indice = i;
                    return false;
                }
            });

            if (indice == null) {
                datasets.push({
                    parameter: parameter.key,
                    name: parameter.label,
                    unit: parameter.unit,
                    series: []
                });
                indice = datasets.length - 1;
            }

            datasets[indice].series.push({
                data: $(data.values).map(function() {
                    return this[header];
                }).get(),
                name: header,
                type: "line",
                color: Highcharts.getOptions().colors[color++],
                fillOpacity: 0.3,
                tooltip: {
                    valueSuffix: ' ' + parameter.unit + " | "
                },
                lineWidth: 1,
                marker: {
                    radius: 4
                },
            });
        });
        makeCharts(datasets);
    }

    function makeCharts(datasets) {
        resetOutputResults();

        datasets.forEach(function(dataset, i) {

            var chartDiv = document.createElement('div');
            chartDiv.className = 'chart';
            document.getElementById('outputCharts').appendChild(chartDiv);

            Highcharts.chart(chartDiv, {
                chart: {
                    scrollablePlotArea: {
                        minWidth: 700
                    },
                    spacingBottom: 50,
                    zoomType: 'x',
                },
                title: {
                    text: dataset.name,
                    align: 'left',
                    margin: 0,
                },
                credits: {
                    enabled: false
                },
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
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    labels: {
                        format: '{value}'
                    },
                    categories: $(input.data).map(function() {
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
                exporting: {
                    buttons: {
                        contextButton: {
                            align: 'right',
                            x: -10,
                            y: -5,
                        }
                    }
                },
                series: dataset.series
            });
        });
        synchroniseCharts("outputCharts");
    }

    function resetOutputResults() {
        $("#outputCharts").empty();
    }
</script>