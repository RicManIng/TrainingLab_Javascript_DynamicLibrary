<!DOCTYPE html>
<html lang="en">
<head>
    <title>TrainingLab Javascript - Dynamic Library</title>
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/home.min.css">
    <script type="module" src="js/utils.js"></script>
    <script type="module" src="js/home.js"></script>
</head>
<body data-username="<?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php require_once 'header.php'; ?>    
    <main>
        <section id="search-form">
            <form>
                <div id="selectContainer">
                    <label for="select">Select a book type : </label>
                    <select name="select" id="select">
                        <option value="" class="optionStandard">Select a book type</option>
                    </select>
                </div>
                <button type="button" id="searchButton">Search</button>
            </form>
        </section>
        <section id="reviews">
            <h1>Reviews</h1>
            <button type="button" id="loadMore">Load More Reviews</button>
        </section>
    </main>
</body>
</html>