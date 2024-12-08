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
        <?php if(isset($_SESSION['usenrname'])): ?>
            <section id="normal-form">

            </section>
        <?php else: ?>
            <section id="error-form">
                <h1>Access Denied</h1>
                <p>You must be logged in to access this page</p>
                <a href="login.php?selected=3&state=login">Go to Login</a>
            </section>
        <?php endif; ?>
    </main>
</body>
</html>