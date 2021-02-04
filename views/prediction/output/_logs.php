<div class="modal fade" id="logs-modal" tabindex="-1" role="dialog" aria-labelledby="logs-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title flex">
                    <h5>Logs #</h5>
                    <h5 class="launch-id"></h5>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</div>

<script>
    function addLog(text, color = "gray", bold = false) {
        let content = getCurrentTime() + " - " + text;
        let log = $("<p>" + content + "</p>");
        if (color) log.addClass("text-" + color);
        if (bold) log.addClass("bold");
        $("#logs-modal .modal-body").append(log).append("<hr>");

        launch.logs.push(content);
    }

    function resetLogs() {
        $("#logs-modal .modal-body").empty();
        launch.logs = [];
    }

    function makeLaunchLogsFile(directory) {
        addLog("Création du fichier de logs...", "black");

        $.ajax({
            type: "POST",
            url: "data/controller.php?action=LAUNCH_LOGS_FILE&directory=" + directory,
            data: JSON.stringify(launch.logs),
            headers: {
                "Content-Type": "application/json"
            },

            success: function(response) {
                addLog("Fichier de logs créé avec succès !", "green");
            },

            error: function(jqXHR, textStatus, errorThrown) {
                addLog("Erreur de création du fichier de logs !", "red");

                if (textStatus == 'timeout')
                    addLog("Controller data ne répond pas", "red");

                if (textStatus == 'error')
                    addLog(errorThrown, "red");
            }
        });
    }
</script>