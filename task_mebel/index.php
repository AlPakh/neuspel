<!DOCTYPE html>
<html lang ="ru">
<head >
    <title>Как ничего не успеть</title>
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
                    <a href="../task_php/world.php">Привет, PHP</a>
                    <a href="index.php">Мебель</a>
                    <a href="../task_naklad/index.php">Орех</a>
                    <a href="../task_voucher/index.php">Ваучер</a>
                </div>
            </div>
        </div>
    </div>


    <div class="container-php">
        <div class="content-php">
        <link rel="stylesheet" type="text/css" href="content styles.css" >
            
        <form action="index.php" method="post">
            <div class="a">
                <label for="name">Имя</label>
                <input type="text" id="name" name="name">
                
                <label for="discount">Скидка</label>
                <input type="range" id="discount" name="discount" min="0" max="25" value="0">
            </div>

            <div class="b">
                <input type="checkbox" id="assembly" name="services[]" value="Сборка">
                <label for="assembly">Сборка</label>
                
                <input type="checkbox" id="delivery" name="services[]" value="Доставка">
                <label for="delivery">Доставка</label>
            </div>


            <div class="c">
                <input type="submit" id="cupboard" name="fur" value="Шкаф">

                <input type="submit" id="table" name="fur" value="Стол">

                <input type="submit" value="Очистить" name="clear">
            </div>

            <div id="result"></img src="img/none.jpg"></div>

            <?php
            $message = ''; // сообщение
            // Проверяем, была ли форма отправлена
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                // какая кнопка была нажата
                if (isset($_POST['fur'])) {
                    $name = $_POST['name'];

                    if(isset($_POST['services'])){
                        $services = implode(', ', $_POST['services']);
                    }
                    else{
                        $services = '';
                    }
                    
                    $product = $_POST['fur'];
                    $discount = $_POST['discount'];

                    $imagePath = "";
                    if ($product === "Шкаф") {
                        $imagePath = "img/fur1.jpg";
                    } else if ($product === "Стол") {
                        $imagePath = "img/fur2.jpg";
                    }


                    // Используйте двойные кавычки для интерполяции переменных
                    $message = "$name <br>Вы выбрали $product<br>скидка $discount%<br>$services";
                }
                // Проверяем, была ли нажата кнопка "Очистить"
                elseif (isset($_POST['clear'])) {
                    // Логика для очистки формы
                    $message = "<br>";
                    $imagePath = "img/none.jpg";
                }
                // Выводим сообщение в элемент с id="result"
                echo "<script>document.getElementById('result').innerHTML = '$message' + '<img src=\"{$imagePath}\">'; </script>";
            }
            ?>


        </form>
            
        </div>
    </div>

</body>
</html>