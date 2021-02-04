<script src="assets/libraries/jsuites/jexcel.js"></script>
<link rel="stylesheet" href="assets/libraries/jsuites/jexcel.css" type="text/css" />
<script src="assets/libraries/jsuites/jsuites.js"></script>
<link rel="stylesheet" href="assets/libraries/jsuites/jsuites.css" type="text/css" />

<div id="grid"></div>

<script>
    function initInputTable() {

        resetInputTable();

        input.table = jexcel(document.getElementById("grid"), {
            search: false,
            pagination: 100,
            data: input.values,
            columns: [{
                type: 'numeric',
                title: input.headers[0],
                mask: '#.000000',
                width: 80,
                decimal: '.',
                readOnly: false,
            }, {
                type: 'numeric',
                title: input.headers[1],
                mask: '#.000000',
                width: 80,
                decimal: '.',
                readOnly: false,
            }, ],
            onchange: function(_, td) {
                _updateSingleInputValue(td);
            },
            onundo: function() {
                _updateInputData();
            },
            onredo: function() {
                _updateInputData();
            },
        });

        function _updateInputData() {
            updateInputData(getInputTableData(), "table");
        }

        function _updateSingleInputValue(td) {
            let params = {
                row: parseFloat($(td).attr("data-y")),
                value: parseFloat($(td).html()),
            }
            updateInputData(getInputTableData(), "table", params);
        }
    }

    function getInputTableData() {
        let times = input.table.getColumnData(0);
        let values = input.table.getColumnData(1);

        return $(values).map(function(i) {
            let obj = {};
            obj[input.headers[0]] = parseFloat(times[i]);
            obj[input.headers[1]] = parseFloat(values[i]);
            return obj;
        }).get();
    }

    function updateInputTable() {
        initInputTable();
    }

    function resetInputTable() {
        $("#grid").empty();
    }
</script>