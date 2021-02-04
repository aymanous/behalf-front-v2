<script src="assets/libraries/json2csv/json2csv.umd.js"></script>

<div id="launch-control" style="display:none">
    <button class="green" onclick="launchPrediction()">
        <i class="fa fa-play"></i><span>Lancer les prédictions</span>
    </button>
</div>

<script>
    let launch = {
        directory: "",
        logs: []
    };

    function enableLaunchPrediction() {
        $("#launch-control").fadeIn();
    }

    function resetLaunch() {
        launch.directory = "";

        resetLogs();
        resetOutput();
    }

    function launchPrediction() {
        resetLaunch();

        addLog("Prédiction lancée par l'utilisateur...", "black", true);

        let data = $(input.values).map(function() {
            return this[input.headers[1]];
        }).get();

        let directory = makeInputFileCSV(data);

        $(".prediction-view").hide();
        $("#loading-view").fadeIn();
    }

    function makeInputFileCSV(data) {
        addLog("Création du fichier de données d'entrée (csv)...", "black");

        $.ajax({
            type: "POST",
            url: "data/controller.php?action=LAUNCH_INPUT_CSV",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },

            success: function(directory) {

                launch.directory = JSON.parse(directory);
                initLaunchId(launch.directory.name);

                addLog("Fichier de données d'entrée créé avec succès (" + launch.directory.name + ") !", "green");
                sendInputFileCSV(window.location.origin + window.location.pathname + launch.directory.path);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                addLog("Erreur de création du fichier de données d'entrée !", "red");

                if (textStatus == 'timeout')
                    addLog("-- Controller data ne répond pas", "red");

                if (textStatus == 'error')
                    addLog("--" + errorThrown, "red");
            }
        });
    }

    function sendInputFileCSV(directory) {
        addLog("Envoi des données d'entrée à l'API (IA)...", "black");

        let dir = "/mnt/c/wamp64/www/ECL/PFE-simu/front/data/launches/" + launch.directory.name;
        // let dir = "/www/behalf/simulator/v2/front/data/launches/" + launch.directory.name;
        $.ajax({
            type: "POST",
            url: api.url + "/predict",
            data: JSON.stringify(dir),
            headers: {
                "Content-Type": "application/json"
            },

            success: function() {
                addLog("L'API (IA) a reçu les données d'entrée avec succès.", "green");
                checkLaunchState(directory);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                addLog("L'API (IA) n'a pas pu recevoir les données d'entrée !", "red");

                if (textStatus == 'timeout') {
                    addLog('-- [Erreur de timeout] : "The server is not responding"', "red");
                }

                if (textStatus == 'error') {
                    addLog('-- [Erreur API] : "' + errorThrown + '"', "red");
                }

                $(".prediction-view").hide();
                $("#error-view").fadeIn();
            }
        });
    }

    function checkLaunchState(directory) {

        addLog("Récupération des résultats de la prédiction...", "black");
        _check();

        let loop = setInterval(() => {
            addLog("Nouvelle tentative de récupération des résultats...", "black");
            _check();
        }, sim_config.recheck_launch_state_interval);

        function _check() {
            var request = $.get(directory + "/output.csv");

            request.done(function(data) {
                clearInterval(loop);

                addLog("Résultats de la prédiction récupérés avec succès !", "green");
                addLog("Péparation des graphiques...", "black");

                $(".prediction-view").hide();
                $("#results-view").fadeIn();

                initResultsData(CSVToJSON(data));
                addLog("Lancement terminé avec succès !", "green", true);

                makeLaunchLogsFile(launch.directory.name);
            });

            request.fail(function(jqXHR, textStatus, errorThrown) {
                addLog("Les résultats ne sont pas encore disponibles.", "orange");

                // if (textStatus == 'timeout') {
                //     addLog('-- Erreur de timeout : " The server is not responding"', "red");
                // }

                // if (textStatus == 'error') {
                //     addLog('-- Erreur API : "' + errorThrown + '"', "red");
                // }
            });

            $("#cancelPrediction").on("click", function() {
                clearInterval(loop);
            });

        }
    }

    function initLaunchId(directory) {
        $(".launch-id").html(directory);
    }

    function cancelPrediction() {
        $(".prediction-view").hide();
        $("#init-view").fadeIn();
    }
</script>