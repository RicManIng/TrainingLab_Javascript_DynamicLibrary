<!DOCTYPE html>
<html lang="en">
<head>
    <title>TrainingLab Javascript - Dynamic Library</title>
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/login.min.css">
    <script type="module" src="js/login.js"></script>
</head>
<body data-username="<?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php 
        require_once 'header.php'; 

        $userArray = json_decode(file_get_contents('./resources/database/user.json'), true);
        $login_error = false;

        if($_GET['state'] === 'login' && isset($_POST['username']) && isset($_POST['password'])) {
            $username = $_POST['username'];
            $password = $_POST['password'];

            foreach($userArray as $user) {
                if($user['username'] === $username && $user['password'] === $password) {
                    $_SESSION['username'] = $username;
                    header('Location: login.php?selected=4&state=account&username=' . $username);
                }
            }
        } else {
            $login_error = true;
        }
    ?>    
    <main>
        <?php if($_GET['state'] === 'login'): ?>
            <section id="login-form">
                <form action="login.php?selected=3&state=login" method="post">
                    <h1>Login</h1>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" required placeholder="insert your username">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required placeholder="insert your password">
                    <?php if($login_error): ?>
                        <p class="error">Invalid username or password</p>
                    <?php endif; ?>
                    <button type="submit">Login</button>
                </form>
            </section>
        <?php elseif($_GET['state'] === 'account'): ?>
            <section id="account-form">

            </section>
        <?php elseif($_GET['state'] === 'logout'): ?>
            <?php 
                session_destroy(); 
                header('Location: login.php?selected=3&state=login'); 
            ?>
        <?php endif; ?>
    </main>
</body>
</html>