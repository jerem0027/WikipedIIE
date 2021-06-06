<!doctype html>

<html lang="fr">
<?php include("header.html"); ?>

<body class="bg-light">
<?php include("navbar.html"); ?>

<div id="nav_article" class="sidepanel">
    <a href="#Synopsis">Synopsis</a>
</div>

<div id="article_title" class="col-12"></div>
<div id="intro_container" class="container">
    <!-- TODO Ajouter message de validation ou juste logo je sais pas encore ce qui est le mieux -->


    <div class="row">
        <div id="article_cat" class="col-12"><b>Catégories:</b> </div>
    </div>

    <div class="row">
        <div id="article_date_crea" class="col-6"><span></span><b>Date de création: </b></div>
        <div id="article_date_modif" class="col-6"><span></span><b>Dernière modification: </b></div>
    </div>

    <div class="row">
        <div class="col-12">
            <h1 id="Synopsis">Synopsis</h1>
        </div>
    </div>
    <div class="row">
        <div id="synopsis_content" class="col-12"></div>
    </div>
</div>

<div id="section_container" class="container"></div>

</body>

</html>
