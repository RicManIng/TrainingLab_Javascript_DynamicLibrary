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
    <?php
        if(isset($_POST['add-item'])){
            $title = $_POST['book-title'];
            $author = $_POST['book-author'];
            $type = $_POST['book-type'];
            $rating = $_POST['book-rating'];
            $url = $_POST['how-to-find'];
            $summary = $_POST['summary'];
            $review = $_POST['review'];
            $username = $_SESSION['username'];
            $date = date('Y-m-d');

            $itemArray = json_decode(file_get_contents('./resources/database/book.json'), true);
            $likesArray = json_decode(file_get_contents('./resources/database/bookLikes.json'), true);

            if (isset($_FILES['image-file']) && $_FILES['image-file']['error'] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['image-file']['tmp_name'];
                $fileName = $_FILES['image-file']['name'];
                $fileSize = $_FILES['image-file']['size'];
                $fileType = $_FILES['image-file']['type'];
                $fileNameCmps = explode(".", $fileName);
                $fileExtension = strtolower(end($fileNameCmps));

                // Specifica le estensioni consentite
                $allowedfileExtensions = ['jpg', 'jpeg', 'png', 'gif'];

                if (in_array($fileExtension, $allowedfileExtensions)) {
                    // Crea un nome unico per il file
                    $newFileName = $username . '_' . uniqid() . '.' . $fileExtension;

                    // Directory di destinazione
                    $uploadFileDir = './resources/img/';
                    if (!is_dir($uploadFileDir)) {
                        mkdir($uploadFileDir, 0755, true);
                    }
                    $dest_path = $uploadFileDir . $newFileName;

                    // Sposta il file nella directory di destinazione
                    if(move_uploaded_file($fileTmpPath, $dest_path)) {
                        $bookPath = $dest_path;
                    }
                }
            }

            $newItem = [
                'id' => count($itemArray),
                'link' => $dest_path,
                'titolo' => $title,
                'autore' => $author,
                'tipologia' => $type,
                'valutazione' => $rating,
                'how-to-buy' => $url,
                'sommario' => $summary,
                'recensione' => $review,
                'username_creatore' => $username,
                'data_creazione' => $date
            ];

            $newLikeItem = [
                'id' => count($itemArray),
                'likes' => []
            ];

            $itemArray[] = $newItem;
            $likesArray[] = $newLikeItem;
            file_put_contents('./resources/database/book.json', json_encode($itemArray, JSON_PRETTY_PRINT));
            file_put_contents('./resources/database/bookLikes.json', json_encode($likesArray, JSON_PRETTY_PRINT));
            header('Location: home.php?selected=1');
            
        }
    ?>
    <main>
        <?php if(isset($_SESSION['username'])): ?>
            <section id="normal-form">
                <h1>Add Review</h1>
                <form action="addItem.php?selected=5&state=add" method="POST" enctype="multipart/form-data" novalidate>
                    <label for="image-file">Add Book Image * :</label>
                    <input type="file" id="image-file" name="image-file" accept="image/*" required>
                    <label for="book-title">Book Title * :</label>
                    <input type="text" id="book-title" name="book-title" required placeholder="insert the book title">
                    <label for="book-author">Book Author * :</label>
                    <input type="text" id="book-author" name="book-author" required placeholder="insert the book author">
                    <label for="book-type">Select book type * :</label>
                    <select name="book-type" id="book-type">
                        <option value="" class="not-select">Select book type</option>
                    </select>
                    <div id="item-rating-view">
                        <label for="book-rating">Book Rating * :</label>
                        <input type="number" id="book-rating" name="book-rating" min="1" max="5" required value="5">
                        <i class="fas fa-star colored" id="star-1"></i>
                        <i class="fas fa-star colored" id="star-2"></i>
                        <i class="fas fa-star colored" id="star-3"></i>
                        <i class="fas fa-star colored" id="star-4"></i>
                        <i class="fas fa-star colored" id="star-5"></i>
                    </div>
                    <label for="how-to-find">Insert the URL to find the book * :</label>
                    <input type="url" id="how-to-find" name="how-to-find" required placeholder="copy and paste the url to buy the book">
                    <label for="summary">Add review summary * :</label>
                    <textarea name="summary" id="summary" required rows="10" placeholder="insert your book summary"></textarea>
                    <p id="summary-counter"></p>
                    <label for="review">Add review * :</label>
                    <textarea name="review" id="review" required rows="20" placeholder="insert your book review"></textarea>
                    <p id="review-counter"></p>
                    <button type="submit" id="submit-button" disabled name="add-item">Add Item</button>
                </form>
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