<!-- HTML -->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<head>
  <meta http-equiv='content-type' content='text/html;charset=UTF-8'>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1'>
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
  <script src="assets/libraries/jquery/jquery-3.5.1.min.js"></script>
  <script src="assets/libraries/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/libraries/bootstrap/js/validator.min.js"></script>
  <script src="assets/libraries/custom/lib.js"></script>
  <script src="config/api.js"></script>

  <link rel="stylesheet" href="assets/libraries/bootstrap/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/libraries/font-awesome/css/all.css" />
  <link rel="stylesheet" href="assets/css/theme.css" />
  <title>Behalf - Prédiction des comportements d'une vanne</title>

  <?php include_once("assets/libraries/custom/lib.php") ?>
</head>

<body class="fixed-header full-height windows desktop pace-done menu-behind">

  <div id="page">
    <?php include_once("router.php") ?>
  </div>
</body>

<link rel="stylesheet" href="assets/css/custom.css" />

</html>