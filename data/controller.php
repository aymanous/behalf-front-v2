<?php
include_once __DIR__ . "./../assets/libraries/custom/lib.php";

$data = json_decode(file_get_contents('php://input'));
switch (qp("action")) {

    case 'LAUNCH_INPUT_CSV':

        $date = new DateTime();
        $directory = $date->getTimestamp() . "/";

        $route = "launches/" . $directory;
        mkdir($route, 0700);

        $fp = fopen($route . "input.csv", "w");
        foreach ($data as $row) {
            fputcsv($fp, (array)$row);
        }
        fclose($fp);

        if (!copy("launches/output_sandbox.csv", $route . "output.csv")) {
            echo "failed to copy $file...\n";
        }

        $response = (object)[
            "path" => "data/launches/" . $directory,
            "name" => $directory,
        ];

        echo json_encode($response);

        break;

    case 'LAUNCH_LOGS_FILE':
        if (!isset($data)) break;

        $directory = qp("directory");
        $route = "launches/" . $directory;

        $fp = fopen($route . "logs.txt", "w");
        foreach ($data as $row) {
            fputcsv($fp, (array)$row);
        }
        fclose($fp);

        break;

    default:
        # code...
        break;
}
