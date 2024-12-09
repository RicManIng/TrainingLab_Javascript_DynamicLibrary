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
        $register_error = false;

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

        if ($_GET['state'] === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            // Recupera i dati del form
            $nome = $_POST['name'];
            $cognome = $_POST['lastname'];
            $email = $_POST['email'];
            $username = $_POST['username'];
            $data_di_nascita = $_POST['age'];
            $password = $_POST['password'];
            $confirm_password = $_POST['confirm-password'];

            // Verifica che le password corrispondano
            if ($password !== $confirm_password) {
                $register_error = true;
                // Gestisci l'errore
            }

            // Gestisci il caricamento dell'immagine
            if (isset($_FILES['account-image']) && $_FILES['account-image']['error'] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['account-image']['tmp_name'];
                $fileName = $_FILES['account-image']['name'];
                $fileSize = $_FILES['account-image']['size'];
                $fileType = $_FILES['account-image']['type'];
                $fileNameCmps = explode(".", $fileName);
                $fileExtension = strtolower(end($fileNameCmps));

                // Specifica le estensioni consentite
                $allowedfileExtensions = ['jpg', 'jpeg', 'png', 'gif'];

                if (in_array($fileExtension, $allowedfileExtensions)) {
                    // Crea un nome unico per il file
                    $newFileName = $username . '_' . uniqid() . '.' . $fileExtension;

                    // Directory di destinazione
                    $uploadFileDir = './resources/img/';
                    $dest_path = $uploadFileDir . $newFileName;

                    // Sposta il file nella directory di destinazione
                    if(move_uploaded_file($fileTmpPath, $dest_path)) {
                        $avatarPath = $dest_path;
                    } else {
                        $register_error = true;
                        // Gestisci l'errore nel caricamento
                    }
                } else {
                    $register_error = true;
                    // Gestisci il tipo di file non valido
                }
            }

            if (!$register_error) {
                // Crea il nuovo utente
                $newUser = [
                    "id" => time(), // O utilizza un metodo per generare ID unici
                    "nome" => $nome,
                    "cognome" => $cognome,
                    "data_di_nascita" => $data_di_nascita,
                    "username" => $username,
                    "password" => password_hash($password, PASSWORD_BCRYPT), // Hash sicuro della password
                    "email" => $email,
                    "avatar" => isset($avatarPath) ? $avatarPath : null
                ];

                // Leggi il file JSON esistente
                $userJsonPath = './resources/database/user.json';
                $jsonData = file_get_contents($userJsonPath);
                $users = json_decode($jsonData, true);

                // Aggiungi il nuovo utente
                $users[] = $newUser;

                // Scrivi di nuovo nel file JSON
                file_put_contents($userJsonPath, json_encode($users, JSON_PRETTY_PRINT));

                // Reindirizza al login
                header('Location: login.php?selected=3&state=login'); 
                exit();
            }
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
                <form action="login.php?selected=3&state=register" method="post" novalidate>
                    <h1>Register</h1>
                    <label for="Name">Name * :</label>
                    <input type="text" name="name" id="name" required placeholder="insert your name" autocomplete="off">
                    <label for="lastname">Lastname * :</label>
                    <input type="text" name="lastname" id="lastname" required placeholder="insert your lastname" autocomplete="off">
                    <label for="email">Email * : </label>
                    <input type="email" name="email" id="email" required placeholder="insert your email" autocomplete="off">
                    <label for="username">Username * : </label>
                    <input type="text" name="username" id="username" required placeholder="insert your username" autocomplete="off">
                    <label for="age">Birth date * : </label>
                    <input type="date" name="age" id="age" required placeholder="insert your birth date" autocomplete="off">
                    <label for="password">Password * : </label>
                    <input type="password" name="password" id="password" required placeholder="insert your password" autocomplete="off">
                    <label for="confirm-password">Confirm Password * : </label>
                    <input type="password" name="confirm-password" id="confirm-password" required placeholder="insert your password" autocomplete="off">
                    <label for="account-image">Insert your account image : </label>
                    <input type="file" name="account-image" id="account-image" accept="image/*">
                    <?php if($register_error): ?>
                        <p class="error">Registration Gone Wrong</p>
                    <?php endif; ?>
                    <button type="submit" disabled>Register</button>
                </form>
            </section>
        <?php endif; ?>
    </main>
</body>
</html>