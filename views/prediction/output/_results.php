<div class="header">
    <div class="row">
        <div class="col-lg-5 text-blue uppercase" style="display: flex;">
            <h5>PRÉDICTION #</h5>
            <h5 class="launch-id"></h5>
        </div>
        <div class="col-lg-7 text-right" style="margin-top: -0.5rem;">
            <button class="gray" data-toggle="modal" data-target="#model-modal">
                <i class="fa fa-project-diagram"></i><span>Système</span>
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
                <h5 class="modal-title">Système fluidique étudié</h5>
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
        $.each(getOutputSensorsList(), function(_, sensor) {

            let parameter = getSensorParameter(sensor);

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
                    return this[sensor];
                }).get(),
                name: sensor,
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

                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    labels: {
                        format: '{value}'
                    },
                    categories: $(input.values).map(function() {
                        return this.time;
                    }).get()
                },
                yAxis: chart_config.yAxis,

                credits: {
                    enabled: false
                },
                legend: chart_config.legend,
                lang: chart_config.lang,
                exporting: _getChartExporting(launch.directory.name + "output_" + dataset.parameter),
                tooltip: chart_config.tooltip,
                
                series: dataset.series
            });
        });
        synchroniseCharts("outputCharts");
    }

    function resetOutputResults() {
        $("#outputCharts").empty();
    }
</script>