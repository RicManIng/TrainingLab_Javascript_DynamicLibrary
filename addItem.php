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
        <?php if(isset($_SESSION['username'])): ?>
            <section id="normal-form">
                <h1>Add Review</h1>
                <form action="addItem.php?selected=5&state=add" method="POST" enctype="multipart/form-data" novalidate>
                    <label for="image-file">Add Book Image * :</label>
                    <input type="file" id="image-file" name="image-file" accept="image/*" required>
                    <label for="book-title">Book Title * :</label>
                    <input type="text" id="book-title" name="book-title" required>
                    <label for="book-author">Book Author * :</label>
                    <input type="text" id="book-author" name="book-author" required>
                    <label for="item-description">Item Description</label>
                    <textarea id="item-description" name="item-description" required></textarea>
                    <label for="item-rating">Item Rating</label>
                    <input type="number" id="item-rating" name="item-rating" min="1" max="5" required value="5">
                    <div id="item-rating-view">
                        <p>Select a rating * : </p>
                        <i class="fas fa-star" id="star-1"></i>
                        <i class="fas fa-star" id="star-2"></i>
                        <i class="fas fa-star" id="star-3"></i>
                        <i class="fas fa-star" id="star-4"></i>
                        <i class="fas fa-star" id="star-5"></i>
                    </div>
                    <label for="how-to-find">Insert the URL to find the book * :</label>
                    <input type="url" id="how-to-find" name="how-to-find" required>
                    
                    <button type="submit">Add Item</button>
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