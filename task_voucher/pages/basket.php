<?php
session_start();

// echo "<pre>";
// print_r($_SESSION);
// echo "</pre>";

require '../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$serviceTypes = [ 
    'rental' => [ 
       'mark' => [
        'Peugeot' => 200, 
        'Lada Priora' => 100, 
        'Nissan' => 300 
       ], 
       'pred_name' => "A1",
       'pred_podgotovka' => [
          'us1' => ['name' => "Бензин", 'price' => 50],
          'us2' => ['name' => "Шина", 'price' => 100],
          'us3' => ['name' => "Омыватель", 'price' => 200]
       ],
 
    ],   
    'sale' => [ 
       'mark' => [ 
        'Citroen' => 500, 
        'Skoda' => 300, 
        'Lexus' => 800 
       ],
       'pred_name' => "A2",
       'pred_podgotovka' => [
          'us1' => ['name' => "Полировка", 'price' => 100],
          'us2' => ['name' => "Чистка салона", 'price' => 50],
          'us3' => ['name' => "ТО", 'price' => 200]
       ],
 
    ], 
    'leasing' => [ 
       'mark' => [ 
        'Kia' => 50, 
        'Honda' => 100, 
        'Mazda' => 80 
       ],
       'pred_name' => "A3",
       'pred_podgotovka' => [
          'us1' => ['name' => "Бензин", 'price' => 50],
          'us2' => ['name' => "Чистка салона", 'price' => 200],
          'us3' => ['name' => "Чистка двигателя", 'price' => 100]
       ],
    ] 
 ]; 

$service_type = $_SESSION['service_type'];

$option_leather_seats = $_SESSION['option_leather_seats'];
$option_seat_heating = $_SESSION['option_seat_heating'];
$option_sunroof = $_SESSION['option_sunroof'];

$car_brand = $_SESSION['car_brand'] ?? 'Не выбрано';
$rental_days = $_SESSION['rental_days'] ?? 'Не указано';
$fast_processing = $_SESSION['fast_processing'] ?? 'Не выбрано';

$selected_mark_price = $_SESSION['serviceTypes'][$service_type]['mark'][$car_brand] ?? 0;
$car_info = $car_brand . ' (+' . $selected_mark_price . ')';

$car_brand = $_SESSION['car_brand'] ?? 'Не выбрано';
$selected_mark_price = $serviceTypes[$service_type]['mark'][$car_brand] ?? 0;
$car_info = $car_brand . ' (+' . $selected_mark_price . ')';

// Опциональная информация, зависящая от типа услуги
if ($service_type === 'rent' || $service_type === 'leasing') {
    $rental_days = $_SESSION['rental_days'] ?? 'Не указано';
} elseif ($service_type === 'sale') {
    $fast_processing = $_SESSION['fast_processing'] ?? 'Нет';
}


                                                            
$servicePrices = [ 
    'rental' => 100, 
    'sale' => 500,
    'leasing' => 2100
 ]; 

$total_price = $selected_mark_price + $servicePrices[$service_type];

if (isset($option_leather_seats) && $option_leather_seats > 0) {
    $total_price += 50;
}
if (isset($option_seat_heating) && $option_seat_heating > 0) {
    $total_price += 30;
}
if (isset($option_sunroof) && $option_sunroof > 0) {
    $total_price += 100;
}

foreach ($serviceTypes[$service_type]['pred_podgotovka'] as $key => $prep) {
    if (isset($_SESSION[$key]) && $_SESSION[$key] === 'on') {
        $total_price += $prep['price'];
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'phpmailpolytech@mail.ru'; 
        $mail->Password = 'iL2JMetCg869Sf3WKs3m'; 
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Получатели
        $mail->setFrom('phpmailpolytech@mail.ru', 'Mailer');
        $mail->addAddress($_SESSION['customer_email'], $_SESSION['customer_name']); 

        // Определение пути к изображениям и CID
        $imagePath = '../tours/';
        $imgFilename = $service_type . '.jpg';
        $cid = $service_type; //Чтобы изображение встраивалось а не прикреплялось файлом

        // Встраивание изображения
        $mail->addEmbeddedImage($imagePath . $imgFilename, $cid, $imgFilename);

        // HTML-контент
        $mail->isHTML(true); 

        $mail->Subject = "Информация о заказе $service_type";

        $content = "<h3>Уважаемый " . htmlspecialchars($_SESSION['customer_name']) . "!</h3>";
        $content .= "<br>";
        $content .= "<p>Наш автосалон рад предложить Вам услугу <strong>" . htmlspecialchars($service_type) . "</strong> автомобиля <strong>" . htmlspecialchars($car_brand) . "</strong></p>";
        if (isset($rental_days)) {
            $content .=  "<p>Количество дней: " . $rental_days . "</p>";
        }
        if (isset($fast_processing)) {
            $content .=  "<p>Ускоренное оформление: " . ($fast_processing === 'yes' ? 'Да' : 'Нет') . "</p>";
        }
        
        $content .= "<p><strong>Предварительная подготовка:</strong></p>";
        foreach ($serviceTypes[$service_type]['pred_podgotovka'] as $key => $prep) {
            if (isset($_SESSION[$key]) && $_SESSION[$key] === 'on') {
                $content .= "<li> " . $prep['name'] . '</li>';
            }
        }

        $content .= "<p><strong>Дополнительная подготовка:</strong></p>";
        if (isset($option_leather_seats) && $option_leather_seats > 0) {
            $content .= "<li>   Кожаные сидения</li>";
        }
        if (isset($option_seat_heating) && $option_seat_heating > 0) {
            $content .= "<li>   Подогрев сидений</li>";
        }
        if (isset($option_sunroof) && $option_sunroof > 0) {
            $content .= "<li>   Люк</li>";
        }

        $content .= "<h1>Полная стоимость заключенного контракта: " . htmlspecialchars($total_price) . " руб.</h2>";
        $content .= "<img src='cid:$cid' alt='Image'>"; // Используем CID как источник изображения

        $mail->Body = $content;

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>

<html>
    <head>
        <title>Работа</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <link href="../css/style.css" rel="stylesheet" type="text/css">
    </head>

    <body topmargin="0" bottommargin="0" rightmargin="0"  leftmargin="0"   background="../images/back_main.gif">
        <table cellpadding="0" cellspacing="0" border="0"  align="center" width="583" height="614">
            <tr>
                <td valign="top" width="583" height="208" background="../images/row1.gif">
                    <div style="margin-left:88px; margin-top:57px "><img src="../images/w1.gif">    </div>
                    <div style="margin-left:50px; margin-top:69px ">
                        <a href="../index.php">Главная<img src="../images/m1.gif" border="0" ></a>
                        <img src="../images/spacer.gif" width="20" height="10">
                        <a href="order.php">Заказ<img src="../images/m2.gif" border="0" ></a>
                        <img src="../images/spacer.gif" width="5" height="10">
                        <a href="basket.php">Корзина<img src="../images/m3.gif" border="0" ></a>
                        <img src="../images/spacer.gif" width="5" height="10">
                        <a href="index-3.php">О компании<img src="../images/m4.gif" border="0" ></a>
                        <img src="../images/spacer.gif" width="5" height="10">
                        <a href="index-4.php">Контакты<img src="../images/m5.gif" border="0" ></a>
                        </form>
                    </div>
                </td>
            </tr>
            <tr>
                <td valign="top" width="583" height="338"  bgcolor="#FFFFFF">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td valign="top" height="338" width="42"></td>
                            <td valign="top" height="338" width="492">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td width="492" valign="top" height="106">

                                            <div style="margin-left:1px; margin-top:2px; margin-right:10px "><br>
                                                <div style="margin-left:5px "><img src="../images/1_p1.gif" align="left"></div>
                                                <div style="margin-left:95px "><font class="title">Название</font><br>

                                                    
                                                    
                                                    
                                                    
                                                </div> 
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="492" valign="top" height="232">
                                            <table cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td valign="top" height="232" width="248">
                                                        <div style="margin-left:6px; margin-top:2px; "><img src="../images/hl.gif"></div>
                                                        <div style="margin-left:6px; margin-top:7px; ">
                                                            <?php 
                                                            echo "<h3>Информация о заказе:</h3>";
                                                            echo "<strong>Тип услуги:</strong> " . $service_type . "<br>";
                                                            echo "<strong>Марка автомобиля:</strong> " . $car_info . "<br>";
                                                            echo "<strong>Дополнительные опции:</strong><br>";

                                                            if (isset($option_leather_seats) && $option_leather_seats > 0) {
                                                                echo "-   Кожаные сидения (+" . $option_leather_seats . ")<br>";
                                                            }
                                                            if (isset($option_seat_heating) && $option_seat_heating > 0) {
                                                                echo "-   Подогрев сидений (+" . $option_seat_heating . ")<br>";
                                                            }
                                                            if (isset($option_sunroof) && $option_sunroof > 0) {
                                                                echo "-   Люк (+" . $option_sunroof . ")<br>";
                                                            }

                                                            if (isset($rental_days)) {
                                                                echo "<strong>Количество дней:</strong> " . $rental_days . "<br>";
                                                            }
                                                            if (isset($fast_processing)) {
                                                                echo "<strong>Ускоренное оформление:</strong> " . ($fast_processing === 'yes' ? 'Да' : 'Нет') . "<br>";
                                                            }
                                                            echo "<strong>Предварительная подготовка:</strong><br>";
                                                            foreach ($serviceTypes[$service_type]['pred_podgotovka'] as $key => $prep) {
                                                                if (isset($_SESSION[$key]) && $_SESSION[$key] === 'on') {
                                                                    echo "-   " . $prep['name'] . ' (+' . $prep['price'] . ')<br>';
                                                                }
                                                            }
                                                            echo "<image width = \"120px\" src = '../tours/" . $service_type . ".jpg'></image>"
                                                            ?>



                                                            
                                                        </div>

                                                        
                                                        
             
                                                 



                                                    <td valign="top" height="215" width="1" background="../images/tal.gif" style="background-repeat:repeat-y"></td>
                                                    <td valign="top" height="215" width="243">
                                                        <div style="margin-left:22px; margin-top:2px; "><img src="../images/hl.gif"></div>

                                                            <img src="../images/1_w2.gif">


                                                        <div style="margin-left:22px; margin-top:7px; ">
                                                            
                                                        <!-- Подсчёт общей  суммы -->
                                                        <h3>Общая сумма:</h3>
                                                            <?php 
                                                                echo $total_price . " у.е.";
                                                            ?>
                                                            <img src="../images/1_w2.gif">
                                                        </div>
                                                        <div style="margin-left:22px; margin-top:13px; ">                                                                
                                                        </div>
                                                        <div style="margin-left:22px; margin-top:16px; "><img src="../images/hl.gif"></div>
                                                        <div style="margin-left:22px; margin-top:7px; ">
                                                        <!-- Кнопка отправки письма -->
                                                        <form action="basket.php" method="post">
                                                            <input type="submit" name="submit" value="Отправить на почту">
                                                        </form>
                                                            <img src="../images/1_w4.gif">
                                                        </div>
                                                        <div style="margin-left:22px; margin-top:9px; ">

                                                            
                                                            
                                                            
                                                                </div> 
                                                            </div>



                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" height="338" width="49"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td valign="top" width="583" height="68" background="../images/row3.gif">
                    <div style="margin-left:51px; margin-top:31px ">
                        <a href="#"><img src="../images/p1.gif" border="0"></a>
                        <img src="../images/spacer.gif" width="26" height="9">
                        <a href="#"><img src="../images/p2.gif" border="0"></a>
                        <img src="../images/spacer.gif" width="30" height="9">
                        <a href="#"><img src="../images/p3.gif" border="0"></a>
                        <img src="../images/spacer.gif" width="149" height="9">
                        <a href="index-5.php"><img src="../images/copyright.gif" border="0"></a>
                    </div>
                </td>
            </tr>

        </table>
    </body>
</html>
