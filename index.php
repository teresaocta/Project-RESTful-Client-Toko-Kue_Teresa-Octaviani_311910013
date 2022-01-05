<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
    <title>Project RESTful Client</title>
</head>

<body>
    <div class="navbar-fixed">
        <nav class="amber lighten-3">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo black-text">SWEETZ</a>
                <a href="#" data-target="slide-out" class="sidenav-trigger black-text"><i class="material-icons">menu</i></a>
                <ul id="nav-mobile" class="topnav right hide-on-med-and-down">
                    <li><a href="#alacarte" class="black-text">Ala Carte</a></li>
                    <li><a href="#drink" class="black-text">Drink</a></li>
                    <li><a href="#package" class="black-text">Package</a></li>
                </ul>
            </div>
        </nav>
    </div>
    <ul id="slide-out" class="sidenav">
        <li><a href="#alacarte" class="black-text">Ala Carte</a></li>
        <li><a href="#drink" class="black-text">Drink</a></li>
        <li><a href="#package" class="black-text">Package</a></li>
    </ul>
    <div class="container">
        <h4 class="card-title"></h4>
        <div id="content-list" class="row">

        </div>
    </div>
    <!--JavaScript at end of body for optimized loading-->
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>

</body>
</html>