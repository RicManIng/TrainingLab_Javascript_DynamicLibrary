<!DOCTYPE html>
<html lang="en">
<head>
    <title>TrainingLab Javascript - Dynamic Library</title>
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/addItem.min.css">
    <script type="module" src="js/addItem.js"></script>
</head>
<body data-username="<?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php require_once 'header.php'; ?>    
    <main>
    </main>
</body>
</html>