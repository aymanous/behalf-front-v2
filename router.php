<?php

$view = qp("view") ? qp("view") : "catalog";

switch ($view) {
    default:
        $path = "prediction/main.php";
        break;
}

if (!@include_once("views/" . $path))
    include_once("views/error/404.php");
