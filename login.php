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
                    <label for="username">Username : </label>
                    <input type="text" name="username" id="username" required placeholder="insert your username">
                    <label for="password">Password : </label>
                    <input type="password" name="password" id="password" required placeholder="insert your password">
                    <?php if(!$login_error): ?>
                        <p class="error">Invalid username or password</p>
                    <?php endif; ?>
                    <button type="submit">Login</button>
                    <p>Don't have an account?</p>
                    <a href="login.php?selected=3&state=register">Register</a>
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
        <?php elseif($_GET['state'] === 'register'): ?>
            <section id="register-form">
                <form action="login.php?selected=3&state=register" method="post">
                    <h1>Register</h1>
                    <label for="Name">Name * :</label>
                    <input type="text" name="name" id="name" required placeholder="insert your name">
                    <label for="lastname">Lastname * :</label>
                    <input type="text" name="lastname" id="lastname" required placeholder="insert your lastname">
                    <label for="email">Email * : </label>
                    <input type="email" name="email" id="email" required placeholder="insert your email">
                    <label for="username">Username * : </label>
                    <input type="text" name="username" id="username" required placeholder="insert your username">
                    <label for="age">Birth date * : </label>
                    <input type="date" name="age" id="age" required placeholder="insert your birth date">
                    <label for="password">Password * : </label>
                    <input type="password" name="password" id="password" required placeholder="insert your password">
                    <label for="password">Confirm Password * : </label>
                    <input type="password" name="password" id="password" required placeholder="insert your password">
                    <label for="account-image">Insert your account image</label>
                    <input type="file" name="account-image" id="account-image">
                    <button type="submit" disabled>Register</button>
                </form>
            </section>
        <?php endif; ?>
    </main>
</body>
</html>