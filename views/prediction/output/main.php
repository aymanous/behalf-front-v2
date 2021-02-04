<link rel="stylesheet" href="assets/css/prediction/output.css" />

<div id="init-view" class="prediction-view" style="display:block;">
    <?php include_once("_init.php"); ?>
</div>

<div id="loading-view" class="prediction-view" style="display:none;">
    <?php include_once("_loading.php"); ?>
</div>

<div id="results-view" class="prediction-view" style="display:none;">
    <?php include_once("_results.php"); ?>
</div>

<div id="error-view" class="prediction-view" style="display:none;">
    <?php include_once("_error.php"); ?>
</div>

<div id="logs-view">
    <?php include_once("_logs.php"); ?>
</div>

<script>
    function resetOutput() {

        resetOutputResults();

        $(".prediction-view").hide();
        $("#init-view").fadeIn();
    }
</script>