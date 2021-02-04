let chart_config = {
  lang: {
    decimalPoint: ".",
    downloadCSV: "Télécharger en CSV",
    downloadJPEG: "Télécharger en JPEG",
    downloadPDF: "Télécharger en PDF",
    downloadPNG: "Télécharger en PNG",
    downloadSVG: "Télécharger en SVG",
    downloadXLS: "Télécharger en XLS",
    drillUpText: "◁ Retour {series.name}",
    exitFullscreen: "Quitter le mode plein écran",
    viewData: "Afficher le tableau",
    hideData: "Masquer le tableau",
    invalidDate: "undefined",
    loading: "Chargement...",
    printChart: "Imprimer",
    months: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    weekdays: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    noData: "Aucune donnée à afficher",
    numericSymbolMagnitude: 1000,
    numericSymbols: ["k", "M", "G", "T", "P", "E"],
    resetZoom: "Reset zoom",
    resetZoomTitle: "Reset zoom level 1:1",
    shortMonths: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    shortWeekdays: "undefined",
    thousandsSep: "\u0020",
    viewFullscreen: "Plein écran",
  },
  exporting: {
    buttons: {
      contextButton: {
        align: "right",
        x: -10,
        y: -5,
        menuItems: [
          "downloadCSV",
          "downloadPDF",
          "downloadPNG",
          "separator",
          "printChart",
          "viewData",
          "viewFullscreen",
        ],
      },
    },
    csv: {
      decimalPoint: ".",
      annotations: {
        itemDelimiter: ",",
        join: false,
      },
    },
  },
  tooltip: {
    shared: true,
    positioner: function () {
      return {
        // right aligned
        x: this.chart.chartWidth - this.label.width - 50,
        y: 0, // align to title
      };
    },
    borderWidth: 0,
    backgroundColor: "none",
    pointFormat: "{point.y}",
    headerFormat: "",
    shadow: false,
    style: {
      fontSize: "15px",
    },
  },
  legend: {
    layout: "horizontal",
    align: "right",
    x: -100,
    verticalAlign: "top",
    y: 40,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      "rgba(255,255,255,0.25)",
  },
  yAxis: [
    {
      title: {
        text: null,
      },
      labels: {
        align: "left",
        x: 3,
        y: 16,
        format: "{value:.,0f}",
      },
      showFirstLabel: false,
    },
    {
      // right y axis
      linkedTo: 0,
      gridLineWidth: 0,
      opposite: true,
      title: {
        text: null,
      },
      labels: {
        align: "right",
        x: -10,
        y: 16,
        format: "{value:.,0f}",
      },
      showFirstLabel: false,
    },
  ],
};

function _getChartExporting(filename) {
  let param = chart_config.exporting;
  param.filename = filename;

  return param;
}

function _getChartTooltip(valueSuffix) {
  let param = chart_config.tooltip;
  param.valueSuffix = valueSuffix;

  return param;
}
