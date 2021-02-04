function synchroniseCharts(divId) {
  ["mousemove", "touchmove", "touchstart"].forEach(function (eventType) {
    document.getElementById(divId).addEventListener(eventType, function (e) {
      var chart, point, i, event;

      for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        // Find coordinates within the chart
        event = chart.pointer.normalize(e);
        // Get the hovered point
        point = chart.series[0].searchPoint(event, true);

        if (point) {
          point.highlight(e);
        }
      }
    });
  });
}

Highcharts.Pointer.prototype.reset = function () {
  return undefined;
};

function syncExtremes(e) {
  var thisChart = this.chart;

  if (e.trigger !== "syncExtremes") {
    // Prevent feedback loop
    Highcharts.each(Highcharts.charts, function (chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) {
          // It is null while updating
          chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
            trigger: "syncExtremes",
          });
        }
      }
    });
  }
}
