<link rel="stylesheet" href="assets/css/prediction/input.css" />

<div class="header">
    <div class="row">
        <div class="col-lg-4 text-blue uppercase" style="display: flex;">
            <h5 class="text-blue">Données d'entrée</h5>
        </div>
        <div class="col-lg-8 text-right" style="margin-top: -0.5rem;">
            <button class="gray">
                <a class="text-black" href="data/assets/entries_format_reference.csv">
                    <i class="fa fa-download"></i>
                    <span>Format de référence</span>
                </a>
            </button>
            <button class="blue" data-toggle="modal" data-target="#import-modal">
                <i class="fa fa-file-import"></i><span>Importer un dataset</span>
            </button>
        </div>
    </div>
</div>

<div id="import-core">
    <?php include_once("_import.php") ?>
</div>

<div id="chart-core">
    <?php include_once("_chart.php") ?>
</div>

<div id="table-core">
    <?php include_once("_table.php") ?>
</div>

<script src="assets/libraries/SheetJS/alertify.js"></script>
<script src="assets/libraries/SheetJS/xlsx.full.min.js"></script>
<script src="assets/libraries/SheetJS/dropsheet.js"></script>
<script src="assets/libraries/SheetJS/spin.js"></script>
<script>
    let input = {
        headers: [],
        values: {}
    };

    var _target = document.getElementById("dropzone");
    var _file = document.getElementById("file");
    var spinner;

    var _onsheet = function(data, sheetnames, select_sheet_cb) {
        input.values = data;
        input.headers = Object.keys(data[0]);
        console.log(input.headers);

        initInputChart();
        initInputTable();

        resetImport();
        resetOutput();
        enableLaunchPrediction();

        $('#import-modal').modal('toggle');
    };

    var _workstart = function() {
        spinner = new Spinner().spin(_target);
    };

    var _workend = function() {
        spinner.stop();
    };

    /** Alerts **/
    var _badfile = function() {
        alertify.alert(
            'This file does not appear to be a valid Excel file.  If we made a mistake, please send this file to <a href="mailto:dev@sheetjs.com?subject=I+broke+your+stuff">dev@sheetjs.com</a> so we can take a look.',
            function() {}
        );
    };

    var _pending = function() {
        alertify.alert(
            "Please wait until the current file is processed.",
            function() {}
        );
    };

    var _large = function(len, cb) {
        alertify.confirm(
            "This file is " +
            len +
            " bytes and may take a few moments.  Your browser may lock up during this process.  Shall we play?",
            cb
        );
    };

    var _failed = function(e) {
        console.log(e, e.stack);
        alertify.alert(
            'We unfortunately dropped the ball here.  Please test the file using the <a href="/js-xlsx/">raw parser</a>.  If there are issues with the file processor, please send this file to <a href="mailto:dev@sheetjs.com?subject=I+broke+your+stuff">dev@sheetjs.com</a> so we can make things right.',
            function() {}
        );
    };

    /** Drop it like it's hot **/
    DropSheet({
        file: _file,
        drop: _target,
        on: {
            workstart: _workstart,
            workend: _workend,
            sheet: _onsheet,
            foo: "bar",
        },
        errors: {
            badfile: _badfile,
            pending: _pending,
            failed: _failed,
            large: _large,
            foo: "bar",
        },
    });


    function updateInputData(data, source, params = null) {
        input.values = data;

        switch (source) {
            case "chart":
                updateInputTable();
                break;

            case "table":
                if (params == null) updateInputChart();
                else updateSingleInputChartValue(params.row, params.value);

                break;

            default:
                updateInputTable();
                if (params == null) updateInputChart();
                else updateSingleInputChartValue(params.row, params.value);
        }
    }

    function resetInput() {
        resetInputTable();
        resetInputChart();
    }
</script>