<button class="green" onclick="launchPrediction()">
    <i class="fa fa-play"></i><span>Lancer les prédictions</span>
</button>

<script>
    function launchPrediction() {

        let filePath = "";

        $(".prediction-view").hide();
        $("#loading-view").fadeIn();

        var request = $.get(api.url + "/launch?filePath=" + filePath);

        request.done(function(launch) {
            checkLaunchState(simulation_id, launch.id);
            addLog("Nouveau lancement créé avec succès (id:" + launch.id + ")", "green");
        });

        request.fail(function(jqXHR, textStatus, errorThrown) {
            addLog("La prédiction n'a pas pu être lancée", "red");

            if (textStatus == 'timeout') {
                addLog('Erreur de timeout : "The server is not responding"', "red");
            }

            if (textStatus == 'error') {
                addLog('Erreur API : "' + errorThrown + '"', "red");
            }

            $(".prediction-view").hide();
            $("#error-view").fadeIn();
        });
    }

    function checkLaunchState(simulation_id, launch_id) {

        let loop = setInterval(() => {

            var request = $.get(api.url + "/simulations/" + simulation_id + "/launches/" + launch_id);

            request.done(function(launch) {
                addLog("Nouvelle vérification du lancement. Statut : " + launch.state, null);
                if (launch.state != "done") return;
                clearInterval(loop);

                addLog("Données des résultats reçues avec succès", "green");
                addLog("Péparation des graphiques des résultats", null);

                $(".prediction-view").hide();
                $("#results-view").fadeIn();

                addLog("Lancement terminé avec succès.", "green");
            });

            request.fail(function(jqXHR, textStatus, errorThrown) {
                addLog("Les résultats n'ont pas pu être générés", "red");
                if (textStatus == 'timeout') {
                    addLog('Erreur de timeout : "The server is not responding"', "red");
                }

                if (textStatus == 'error') {
                    addLog('Erreur API : "' + errorThrown + '"', "red");
                }

                $(".prediction-view").hide();
                $("#error-view").fadeIn();
                clearInterval(loop);
            });

        }, sim_config.recheck_launch_state_interval);
    }
</script>