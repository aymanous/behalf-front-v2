<script src="assets/libraries/jsuites/jexcel.js"></script>
<link rel="stylesheet" href="assets/libraries/jsuites/jexcel.css" type="text/css" />
<script src="assets/libraries/jsuites/jsuites.js"></script>
<link rel="stylesheet" href="assets/libraries/jsuites/jsuites.css" type="text/css" />

<div id="grid"></div>

<script>
    let table;

    function initInputTable(data) {
        $("#grid").empty();

        table = jexcel(document.getElementById("grid"), {
            tableOverflow: false,
            lazyLoading: false,
            loadingSpin: true,
            search: true,
            pagination: 100,
            data: data,
            columns: [{
                type: 'numeric',
                title: "Temps",
                mask: '#.000000',
                width: 80,
                decimal: '.',
                readOnly: false,
            }, {
                type: 'numeric',
                title: "Débit",
                mask: '#.000000',
                width: 80,
                decimal: '.',
                readOnly: false,
            }, ],


        });
    }
</script>