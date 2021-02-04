<div class="modal fade" id="import-modal" tabindex="-1" role="dialog" aria-labelledby="import-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Importer un dataset</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="dropzone">
                    <div id="drop">
                        <input type="file" id="file" value="" /><label for="file"></label>
                    </div>
                </div>
                <p>Glissez un fichier ou cliquez ci-dessus pour importer.</p>
            </div>
        </div>
    </div>
</div>


<script>
    function resetImport() {
        $("#drop input").val("");
    }
</script>