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
                </div>
            </div>
        </div>
    </div>


    <div class="container-php">
        <div class="cont-php" style="display: flex; flex-direction: column; align-items: center">
            <link rel="stylesheet" type="text/css" href="content styles.css?v=1.1" >
            <form id="orderForm" method="post" enctype="multipart/form-data" style="gap: 1vh">
                
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 2vh;">
                    <div style="display: flex; flex-direction: column; justify-content: left">
                        <label class="textLabel"  for="surname">Фамилия:</label>
                        <label class="textLabel"  for="city"> Город доставки:</label>
                        <label class="textLabel"  for="date">Дата доставки:</label>
                        <label class="textLabel"  for="address">Адрес:            </label>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: left">
                        <input class="textLabel " type="text" id="surname" name="surname" required>
                        <select class="textLabel" id="city" name="city">
                            <option value="Москва">Москва</option>
                            <option value="Санкт-Петербург">Санкт-Петербург</option>
                            <option value="Казань">Казань</option>
                            <option value="Пермь">Пермь</option>
                        </select>
                        <input class="textLabel " type="date" id="date" name="date" required>
                        <input class="textLabel " type="text" id="address" name="address" required>
                    </div>
                </div>



                <div id="lowerGrid" style="justify-content: center;">
                    <fieldset id="Tsvet">
                        <legend><strong>Выберите <br>цвет мебели</strong></legend>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="oreh" value="Орех">
                            <span class="custom-radio"></span> Орех</label>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="dub" value="Дуб мореный">
                            <span class="custom-radio"></span> Дуб мореный</label>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="pali" value="Палисандр">
                            <span class="custom-radio"></span> Палисандр</label>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="eben" value="Эбеновое дерево">
                            <span class="custom-radio"></span> Эбеновое дерево</label>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="klen" value="Клен">
                            <span class="custom-radio"></span> Клен</label>
                        <label>
                            <input  class="radioLabel" type="radio" name="color" id="listv" value="Лиственница">
                            <span class="custom-radio"></span> Лиственница</label>
                    </fieldset>
                    <div id="innerGrid">
                        <fieldset id=Mebel>
                            <legend><strong>Выберите <br>предметы мебели</strong></legend>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Банкетка"> Банкетка</label>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Кровать"> Кровать</label>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Комод"> Комод</label>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Шкаф"> Шкаф</label>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Стул"> Стул</label>
                            <label><input class="checkLabel"  type="checkbox" name="furniture[]" value="Стол"> Стол</label>
                        </fieldset>
                        <fieldset id="Kolvo" style="display: flex; flex-direction: row; align-items: top; justify-content: center;">
                            <legend><strong><br>Количество:</strong></legend>
                            <div style="display: flex; flex-direction: column; justify-content: left">
                                <label>Банкетка</label>
                                <label>Кровать</label>
                                <label>Комод</label>
                                <label>Шкаф</label>
                                <label>Стул</label>
                                <label>Стол</label>
                            </div>
                            <div style="display: flex; flex-direction: column; justify-content: left">
                                <input class="textLabel "  type="number" id="quantity" name="quantity_banketka" min="1" value="1" required>
                                <input class="textLabel "  type="number" id="quantity" name="quantity_krovat" min="1" value="1" required>
                                <input class="textLabel "  type="number" id="quantity" name="quantity_komod" min="1" value="1" required>
                                <input class="textLabel "  type="number" id="quantity" name="quantity_shkaf" min="1" value="1" required>
                                <input class="textLabel "  type="number" id="quantity" name="quantity_stul" min="1" value="1" required>
                                <input class="textLabel "  type="number" id="quantity" name="quantity_stol" min="1" value="1" required>
                            </div>
                        </fieldset>
                    </div>
                </div>

                
                <label for="quantity"  style="justify-content: center;"></label>
                

                <label for="price_file"  style="justify-content: center;">Выбрать файл с ценами:</label>
                <input class="" type="file" id="price_file" name="price_file" accept=".txt" required>

                <input class="button" type="submit" value="Оформить заказ">
                
                <div id="result">



                <?php
                require './vendor/autoload.php';

                use PhpOffice\PhpSpreadsheet\Spreadsheet;
                use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;

                    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                        $file = $_FILES['price_file'];

                        $filePath = $file['tmp_name'];
                        $prices = [];

                        // Читаем содержимое файла построчно
                        $fileHandle = fopen($filePath, "r");
                        if ($fileHandle) {
                            // Чтение и игнорирование первой строки с заголовком
                            fgets($fileHandle);

                            while (($line = fgets($fileHandle)) !== false) {
                                $data = explode("\t", $line);  // Разделяем строку и сохраняем в массив
                                $prices[$data[0]] = intval($data[1]); // Конвертируем цену в целое число
                            }
                            fclose($fileHandle);
                        }

                        // Наценка за цвет мебели
                        $colorMarkup = [
                            'Орех' => 1.1,
                            'Дуб мореный' => 1.2,
                            'Палисандр' => 1.3,
                            'Эбеновое дерево' => 1.4,
                            'Клен' => 1.5,
                            'Лиственница' => 1.6
                        ];

                        // Получаем данные из формы
                        $selectedColor = $_POST['color'];
                        $selectedFurniture = isset ($_POST['furniture']) ? $_POST['furniture'] : [];

                        $quantity_banketka = $_POST['quantity_banketka'] ?? 0;
                        $quantity_krovat = $_POST['quantity_krovat'] ?? 0;
                        $quantity_komod = $_POST['quantity_komod'] ?? 0;
                        $quantity_shkaf = $_POST['quantity_shkaf'] ?? 0;
                        $quantity_stul = $_POST['quantity_stul'] ?? 0;
                        $quantity_stol = $_POST['quantity_stol'] ?? 0;

                        $mapping = [
                            'Банкетка' => 'quantity_banketka',
                            'Кровать' => 'quantity_krovat',
                            'Комод' => 'quantity_komod',
                            'Шкаф' => 'quantity_shkaf',
                            'Стул' => 'quantity_stul',
                            'Стол' => 'quantity_stol',
                        ];

                        // Рассчитываем стоимость заказа
                        $totalCost = 0;
                        foreach ($selectedFurniture as $furnitureItem) {

                            if (isset ($mapping[$furnitureItem])) {    // существует соответствие для данного предмета мебели
                                $quantityFieldName = $mapping[$furnitureItem];

                                $quantity = $_POST[$quantityFieldName] ?? 0;
                                $price = $prices[$furnitureItem] ?? 0;
                                $price *= $colorMarkup[$selectedColor] ?? 1.0;

                                $totalCost += $price * $quantity;

                                //echo "Название: $furnitureItem, Количество: $quantity, Цена за штуку: $price, Общая стоимость: " . ($price * $quantity) . "<br>";
                            }
                        }

                        echo "<strong>Стоимость вашего заказа: $totalCost</strong>";

                        $documentContent = "Стоимость вашего заказа: $totalCost\n";
                        $documentContent .= "Выбранный цвет мебели: $selectedColor\n";
                        $documentContent .= "Выбранные предметы мебели:\n";


                        // // Сохраняем документ
                        // $documentFileName = "order_details_" . date("Y-m-d") . ".txt"; // Пример названия файла: order_details_2024-03-15.txt
                        // file_put_contents($documentFileName, $documentContent);
                    
                        // echo "<p><a href='$documentFileName'>Скачать документ с информацией о заказе</a></p>";
                    


                        
                        // Создаем новый Spreadsheet объект
                        $spreadsheet = new Spreadsheet();

                        // Получаем активный лист
                        $sheet = $spreadsheet->getActiveSheet();

                        // Заполняем лист данными
                        $sheet->setCellValue('A1', 'Hello World !');

                        // Настройки для сохранения PDF
                        $writer = new Mpdf($spreadsheet);

                        // Укажите путь куда сохранять PDF
                        $filePath = 'hello_world.pdf';

                        // Сохраняем файл
                        $writer->save($filePath);

                }


                    ?>

                </div>
            </form>
        </div>

    </div>

    


    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
    
    <script>
    Сохранение данных формы
        var postData = <?php echo json_encode($_POST); ?>; //объект из данных формы, полученных на сервере и преобразованных в JSON

        Object.keys(postData).forEach(function (key) {
            var elements = document.getElementsByName(key);
            if (elements.length) {
                elements.forEach(function (element) {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        element.checked = element.value === postData[key];
                    } else {
                        element.value = postData[key];
                    }
                });
            }
        });

        // Object.keys(postData).forEach(function (key) {
        //     var element = document.getElementsByName(key)[0];
        //     if (element) {
        //         element.value = postData[key];
        //     }
        // });
    </script>
<?php endif; ?>
    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        /* Сохранение данных формы */
        <script>
            var postData = <?php echo json_encode($_POST); ?>; //объект из данных формы, полученных на сервере и преобразованных в JSON

            Object.keys(postData).forEach(function (key) {
                var elements = document.getElementsByName(key);
                if (elements.length) {
                    elements.forEach(function (element) {
                        if (element.type === 'checkbox' || element.type === 'radio') {
                            element.checked = element.value === postData[key];
                        } else {
                            element.value = postData[key];
                        }
                    });
                }
            });
        </script>
    <?php endif; ?>
    
    </body>
</html>