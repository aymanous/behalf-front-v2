<link rel="stylesheet" href="assets/css/prediction/input.css" />

<div class="header">
    <div class="row">
        <div class="col-lg-6">
            <h4>Données d'entrée</h4>
        </div>
        <div class="col-lg-6 text-right">
            <a href="data/assets/entries_format_reference.csv">Télécharger le format de référence</a>
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
        data: {}
    };

    var _target = document.getElementById("dropzone");
    var _file = document.getElementById("file");
    var spinner;

    var _onsheet = function(data, sheetnames, select_sheet_cb) {
        input.data = data;

        initInputChart(data);
        initInputTable(data);

        resetImport();
        resetOutput();
        enableLaunchPrediction();
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


    function updateInputData(data, source) {
        input.data = data;

        switch (source) {
            case "chart":
                updateInputTable(input.data);
                break;

            case "table":
                // updateInputChart(input.data);
                break;

            default:
                updateInputTable(input.data);
                updateInputChart(input.data);
        }
    }

    function resetInput() {
        resetInputTable();
        resetInputChart();
    }
</script>