<?php
if(isset($_GET['uid'])) {
    $uid = $_GET['uid'];
    if(isset($_GET['title'])) {
        $title = $_GET['title'];
    }
    
    $blogJsonPath = 'https://productivity.rocks/tool/ai-optimizer/api/blog/';
    $blogJsonContent = file_get_contents($blogJsonPath);
    $blogJson = json_decode($blogJsonContent, true);

    foreach ($blogJson['content'] as $i => $blogPost) {
        if($blogPost['uid'] == $title = $_GET['uid']) {
            $thisBlogPostTitle = $blogJson['content'][$i]['title'];
            $thisBlogPostDescription = $blogJson['content'][$i]['description'];
            $thisBlogPostDate = $blogJson['content'][$i]['date'];
            $thisBlogPostContent = $blogJson['content'][$i]['content'];
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <!-- Title -->
    <title><?php echo $thisBlogPostTitle ?> | Blog | Aachen App</title>
    <?php echo file_get_contents('https://www.aachen-app.de/assets/docs/php/head/'); ?>
    <link rel="stylesheet" href="https://www.aachen-app.de/blog/page.css?version=1.1">
    <meta name="apple-itunes-app" content="app-id=1554053875">
    <script src="page.js?v=2"> </script>
    <!-- SEO texts -->
    <!-- <meta http-equiv="refresh" content="1" > -->
    <meta name="description" content="<?php echo $thisBlogPostDescription ?>">
    <!-- <meta name="keywords" content="Aachen App, Download"> -->
</head>
<script src="https://kit.fontawesome.com/b0b871fd53.js" crossorigin="anonymous"></script>

<body>
    
    <section id="landing">
        <div class="title">
            <h1><?php echo $thisBlogPostTitle ?></h1>
        </div>
        <div class="img">
            <img src="https://www.aachen-app.de/assets/img/fynn-jorit.png" alt="Fynn & Jorit">
        </div>
    </section>
    <article id="content" uid="<?php echo $blogPost['uid'] ?>">
        <div class="wraper">
            <?php echo $thisBlogPostContent ?>
            <div class="buttons">
                <button class="einsehen" id="likeButton">Gefällt mir</button>
                <a href="https://aachen-app.de/blog/" class="noLinkUnderline"><button class="mitmachen">Weitere Beiträge</button></a>
            </div>
        </div>
    </article>

    <div id="scrollToTop">
        <div class="overlay">
            <div class="arrow"></div>
        </div>
    </div>

    <hr id="seperateFooter">


</body>
</html>
<?php
            die;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <!-- Title -->
    <title>Blog | Aachen App</title>
    <?php
        // echo file_get_contents('https://www.aachen-app.de/assets/docs/php/head/');
    ?> 
    <link rel="stylesheet" href="https://productivity.rocks/tool/ai-optimizer/css/main.css">
    <script src="../assets/js/general.js"></script>
    <link rel="stylesheet" href="page.css">
    <meta name="apple-itunes-app" content="app-id=1554053875">
    <!-- SEO texts -->
    <!-- <meta http-equiv="refresh" content="1" > -->
    <meta name="description" content="<?php 'Blog' ?>">
    <!-- <meta name="keywords" content="Aachen App, Download"> -->
</head>
<script src="https://kit.fontawesome.com/b0b871fd53.js" crossorigin="anonymous"></script>

<body>
    
    <!-- <?php echo file_get_contents('https://www.aachen-app.de/assets/docs/php/header/'); ?> -->
    <header>
        <div class="content">
            <h1>ChatGPT Optimizer</h1>
            <a href="https://productivity.rocks/tool/ai-optimizer/for/chrome/">Download for Chrome</a>
        </div>
    </header>
    
    <section id="landing">
        <div class="title">
            <h1>The AI Blog</h1>
        </div>
        <div class="img">
            <img src="cover.jpg" alt="Fynn & Jorit">
        </div>
    </section>

    <section id="content" class="blogOverview">
        <?php
            $blogJsonPath = 'https://productivity.rocks/tool/ai-optimizer/api/blog/';
            $blogJsonContent = file_get_contents($blogJsonPath);
            $blogJson = json_decode($blogJsonContent, true);
            foreach ($blogJson['content'] as $i => $blogPost) {
                for ($i=0; $i < 5; $i++) {
        ?>
            <div class="blogMessageBox" jrtAnimation="['fadeBot']">
                <div class="img">
                    <img src="<?php echo $blogPost['coverImg'] ?>">
                </div>
                <div class="text">
                    <div class="info">
                        <span class="date">
                            <!-- <?php echo date('Y-m-d', $blogPost['created']); ?> -->
                            <?php echo (($diff = time() - $blogPost['created']) < 60) ? (($diff == 1) ? '1 second ago' : $diff . ' seconds ago') : (($diff < 3600) ? (($diff < 120) ? (floor($diff / 60) . ' minute ago') : (floor($diff / 60) . ' minutes ago')) : (($diff < 86400) ? (($diff < 7200) ? (floor($diff / 3600) . ' hour ago') : (floor($diff / 3600) . ' hours ago')) : (($diff < 604800) ? (($diff < 172800) ? (floor($diff / 86400) . ' day ago') : (floor($diff / 86400) . ' days ago')) : (($diff < 2419200) ? (floor($diff / 604800) . ' week ago') : (($diff < 29030400) ? (floor($diff / 2419200) . ' month ago') : (floor($diff / 29030400) . ' year ago')))))); ?>
                        </span>
                        <span class="inform">
                            <span>
                                <?php echo count($blogPost['likes']) ?>
                            </span>
                            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="favouriteIconTitle" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="favouriteIconTitle">Favourite</title> <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/> </svg>
                        </span>
                        <span class="views">
                            <span>
                                <?php echo $blogPost['views'] ?>
                            </span>
                            <svg width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeIconTitle" stroke="#2d2d2d" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="eyeIconTitle">Visible (eye)</title> <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/> <circle cx="12" cy="12" r="3"/> </svg>
                        </span>
                    </div>
                    <div class="textContent">
                        <h4><?php echo $blogPost['title'] ?></h4>
                        <p><?php echo $blogPost['description']?></p>
                    </div>
                    <a class="read" href="<?php echo $blogPost['uid']?>">Read</a>
                </div>
            </div>
        <?php
                // if($i >= 3) {break;}
                }
            }
        ?>
    </section>

</body>
</html>
