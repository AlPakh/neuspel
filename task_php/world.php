<!DOCTYPE html>
<html lang ="ru">
<head >
    <title>Hello, PHP</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../styles.css" >
</head>
<body>
    <div class="header"> 
        <div class="header_main">        
            <div class="logo">
                <div class="overlap-group">
                    <div class="d20_back"></div>
                    <div class="d20_lines"></div>
                    <div class="tsi12">12</div>
                    <div class="dice_letter" id="letP">П</div>
                    <div class="dice_letter" id="letV">В</div>
                    <div class="dice_letter" id="letA">А</div>
                </div>
                      
            </div>
            <a class="title" href="../index.php">Как ничего не успеть</a>
        </div>

        <div class="header_text">
            <a class="text_menu" href="../task_game/index.html">Главная</a>
            <div class="text_menu">Проекты
                <div class="dropdown-content">
                    <a href="../task_ris/index.html">Рисунок CSS</a>
                    <a href="../task_svg/index.html">Рисунок SVG</a>
                    <a href="../task_js/index.html">Основы JavaScript</a>
                    <a href="../task_dom/index.html">DOM-тест</a>
                    <a href="../task_dop/index.html">Пазл (доп.)</a>
                    <a href="world.php">Привет, PHP</a>
                    <a href="../task_mebel/index.php">Мебель</a>
                    <a href="../task_naklad/index.php">Орех</a>
                    <a href="../task_voucher/index.php">Ваучер</a>
                </div>
            </div>
        </div>
    </div>


    <div class="container-php">
        <div class="content-php">
            
            <?php
            echo "Hello, World!";
            ?>
            
        </div>
    </div>

</body>
</html>