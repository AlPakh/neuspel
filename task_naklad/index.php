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
                    <a href="../task_mebel/index.php">Мебель</a>
                    <a href="index.php">Орех</a>
                    <a href="../task_voucher/index.php">Ваучер</a>
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
                    require_once 'vendor/autoload.php';

                    use PhpOffice\PhpSpreadsheet\Spreadsheet;
                    use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;
                    use PhpOffice\PhpSpreadsheet\IOFactory;
                    use PhpOffice\PhpSpreadsheet\Cell\DataType;

                    //ob_start();

                    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                        $file = $_FILES['price_file'];

                        $filePath = $file['tmp_name'];
                        $prices = [];

                        // Читаем содержимое файла
                        $fileHandle = fopen($filePath, "r");
                        if ($fileHandle) {
                            fgets($fileHandle);   //  первая строка

                            while (($line = fgets($fileHandle)) !== false) {
                                $data = explode("\t", $line);
                                $prices[$data[0]] = intval($data[1]);
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

                        $colorImage = [
                            'Орех' => 'D:\OSPanel\domains\neuspel\task_naklad\img\орех',
                            'Дуб мореный' => 'D:\OSPanel\domains\neuspel\task_naklad\img\дуб',
                            'Палисандр' => 'D:\OSPanel\domains\neuspel\task_naklad\img\палисандр',
                            'Эбеновое дерево' => 'D:\OSPanel\domains\neuspel\task_naklad\img\эбен',
                            'Клен' => 'D:\OSPanel\domains\neuspel\task_naklad\img\клен',
                            'Лиственница' => 'D:\OSPanel\domains\neuspel\task_naklad\img\лиственница'
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

                        $items = [];

                        $totalCost = 0;
                        foreach ($selectedFurniture as $furnitureItem) {

                            if (isset ($mapping[$furnitureItem])) {
                                $quantityFieldName = $mapping[$furnitureItem];

                                $quantity = $_POST[$quantityFieldName] ?? 0;
                                $price = $prices[$furnitureItem] ?? 0;

                                $items[$furnitureItem] = ['quantity' => $quantity, 'price' => $price];

                                $price *= $colorMarkup[$selectedColor] ?? 1.0;


                                $totalCost += $price * $quantity;

                                //echo "Название: $furnitureItem, Количество: $quantity, Цена за штуку: $price, Общая стоимость: " . ($price * $quantity) . "<br>";
                            }
                        }

//echo print_r($items);

                        $documentContent = "Стоимость вашего заказа: $totalCost\n";
                        $documentContent .= "Выбранный цвет мебели: $selectedColor\n";
                        $documentContent .= "Выбранные предметы мебели:\n";


                        // // Сохраняем документ
                         //$documentFileName = "order_details_" . date("Y-m-d") . ".txt"; // Пример названия файла: order_details_2024-03-15.txt
                         //file_put_contents($documentFileName, $documentContent);
                    
                        // echo "<p><a href='$documentFileName'>Скачать документ с информацией о заказе</a></p>";
                    

//========================
                    
                        $spreadsheet = new Spreadsheet();

                        $sheet = $spreadsheet->getActiveSheet();// Получаем активный лист

                        $spreadsheet->getDefaultStyle()->getFont()->setName('Times New Roman');
                        $spreadsheet->getDefaultStyle()->getFont()->setSize(24);
                        $sheet->getColumnDimension('A')->setWidth(50);
                        $sheet->getColumnDimension('B')->setWidth(30);

                        $invoiceNumber = random_int(1000, 9999);

                        //ВЕРХНЯЯ ЧАСТЬ
                        $drawing = new PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                        $drawing->setName('Штрих');
                        $drawing->setDescription('Штрих');
                        $drawing->setPath('D:\OSPanel\domains\neuspel\task_naklad\img\штрих.JPG');
                        $drawing->setHeight(120); // Высота в пикселях
                        $drawing->setCoordinates("A1"); 
                        $sheet->getStyle("A1")->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
                        $sheet->getStyle("A1")->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_TOP);
                        $drawing->setWorksheet($sheet);
                        $sheet->getRowDimension('1')->setRowHeight(150); 

                        $sheet->mergeCells("A2:B2");
                        $sheet->setCellValue('A2', 'Накладная № ' . $invoiceNumber);
                        $sheet->getStyle('A2')->getFont()->setBold(true);
                        $sheet->getStyle('A2')->getFont()->setSize(54);

                        $sheet->mergeCells("A3:B3");
                        $sheet->setCellValue('A3', 'Адрес получения заказа: ' . $_POST['address']);

                        $sheet->mergeCells("A4:B4");
                        $sheet->setCellValue('A4', 'Дата получения заказа: ' . $_POST['date']);

                        $sheet->getStyle('A2:A4')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);



                        //ТАБЛИЦА
                        $sheet->getStyle('A6')->getAlignment()->setWrapText(true);
                        $sheet->getStyle('A6')->getFont()->setSize(24);
                        $textLines = [];
                        $noNatsPrice = 0;

                        $minLine = 6;
                        $startLine = 6;
                        foreach ($items as $item => $details) {
                            $textLine = "•" .  $item . " ". $details['quantity'] . "шт - " . ($details['price'] * $details['quantity']) . "р";
                            $noNatsPrice += $details['price'] * $details['quantity'];

                            $sheet->setCellValue("A$startLine", $textLine);
                            $sheet->getStyle("A$startLine")->getAlignment()->setWrapText(true);
                            $sheet->getStyle("A$startLine")->getFont()->setSize(24);
                            $sheet->getRowDimension($startLine)->setRowHeight(40); 
                            $sheet->getStyle("B$minLine")->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
                            $startLine++;
                        }

                        $sheet->mergeCells("B$minLine:B$startLine");

                        $sheet->setCellValue("B$minLine", "Сумма: " . $noNatsPrice);
                        $sheet->getStyle("B$minLine")->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);                        
                        
                        $sheet->setCellValue('A' . $startLine+1, 'Цвет: ' . $selectedColor . ", наценка " . $colorMarkup[$selectedColor]);

                        $sheet->setCellValue("B" . $startLine+1 , '');
                        $drawing = new PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                        $drawing->setName('Цвет');
                        $drawing->setDescription('Цвет');
                        $drawing->setPath($colorImage[$selectedColor] . '.png');
                        $drawing->setHeight(70);
                        $drawing->setCoordinates("B" . $startLine+1 ); 
                        $sheet->getStyle("B" . $startLine+1 )->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        $drawing->setWorksheet($sheet);

                        $sheet->getStyle("A$minLine:B" . $startLine+1)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);

                        $sheet->getRowDimension($startLine+1)->setRowHeight(80); 
                        $styleArray = [
                            'borders' => [
                                'allBorders' => [
                                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                    'color' => ['argb' => '000000'],
                                ],
                            ],
                        ];

                        $sheet->setCellValue("A" . $startLine+2, 'Итого:');
                        $sheet->setCellValue("B" . $startLine+2, $totalCost);
                        $sheet->getStyle("A" . $startLine+2 .":B" . $startLine+2)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
                        $sheet->getStyle("A" . $startLine+2 .":B" . $startLine+2)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
                        $sheet->getStyle("A" . $startLine+2 .":B" . $startLine+2)->getFont()->setBold(true);
                        
                        $sheet->getRowDimension($startLine+2)->setRowHeight(40); 

                        $sheet->getStyle("B" . $minLine .":B" . $startLine+2)->applyFromArray($styleArray);
                        $sheet->getStyle("A" . $startLine+1 .":A" . $startLine+2)->applyFromArray($styleArray);

                        if ($minLine != $startLine) {
                            $TopCell = [
                                'borders' => [
                                    'top' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '00000'],
                                    ],
                                    'left' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '00000'],
                                    ],
                                    'right' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ],
                                    'bottom' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => 'ffffff'],
                                    ]
                                ],
                            ];

                            $MidCell = [
                                'borders' => [
                                    'top' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => 'ffffff'],
                                    ],
                                    'left' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ],
                                    'right' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ],
                                    'bottom' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => 'ffffff'],
                                    ]
                                ],
                            ];

                            $EndCell = [
                                'borders' => [
                                    'top' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => 'ffffff'],
                                    ],
                                    'left' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ],
                                    'right' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ],
                                    'bottom' => [
                                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                        'color' => ['argb' => '000000'],
                                    ]
                                ],
                            ];
                            
                            $sheet->getStyle("A" . $minLine . ":A" . $startLine)->applyFromArray($MidCell);
                            $sheet->getStyle("A" . $minLine)->applyFromArray($TopCell);
                            $sheet->getStyle("A" . $startLine)->applyFromArray($EndCell);
                        }
                        else{
                            $sheet->getStyle("A" . $minLine . ":A" . $startLine)->applyFromArray($styleArray);
                        }

                        //НИЖНЯЯ ЧАСТЬ
                        $sheet->mergeCells("A" . $startLine+3 .":B" . $startLine+3);
                        $sheet->setCellValue("A" . $startLine+3, 'Всего наименований ' . count($items) . " на сумму " . $totalCost . ",00");
                        $sheet->getStyle("A" . $startLine+3)->getFont()->setBold(true);

                        $sheet->getRowDimension($startLine+3)->setRowHeight(40); 
                        $sheet->getStyle("A" . $startLine+3 .":B" . $startLine+3)->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_BOTTOM);

                        $filegarant = "Гарантийное обслуживание.txt";
                        $content = file_get_contents($filegarant);
                        $lines = explode("\n", $content);

                        $currentLetter = 'A'; //нумерация

                        $currentRow = $startLine+5;
                        foreach ($lines as $line) {
                            $sheet->mergeCells("A$currentRow:B$currentRow");
                            $line = preg_replace_callback('/^\d+\.\t/', function () use (&$currentLetter) {// Заменяем цифровую нумерацию на буквы
                                return $currentLetter++ . ".\t";
                            }, $line);
                            
                            $sheet->setCellValue("A$currentRow", $line);
                            $sheet->getStyle("A$currentRow")->getAlignment()->setWrapText(true);
                            $sheet->getStyle("A$currentRow")->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_JUSTIFY);
                            
                            $currentRow++;
                        }
                        $sheet->getStyle('A' . $startLine+5)->getFont()->setBold(true); //Информация о гарантийном обслуживании:
                        $sheet->getStyle('A' . $startLine+5)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                        


                        $writer = new Mpdf($spreadsheet);
                        $fileName = "Документ_на_выдачу_$invoiceNumber.pdf";
                        $writer->writeAllSheets();
                        $writer->save($fileName);
                    }
                    ?>
                
                </div>
            </form>
        </div>

    </div>


    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
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