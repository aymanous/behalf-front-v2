<div class="modal fade" id="logs-modal" tabindex="-1" role="dialog" aria-labelledby="logs-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-blue">Logs</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</div>

<script>
    function addLog(text, color) {
        let style = color ? "class='text-" + color + "'" : "";
        $("#logs-modal .modal-body").prepend("<hr>").prepend("<p " + style + ">" + getCurrentTime() + " - " + text + "</p>");
    }
</script>