<?php
session_start();

$selectedServiceType = $_SESSION['service_type'] ?? null; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_SESSION['service_type'] = $_POST['service_type'];
    $_SESSION['option_leather_seats'] = isset($_POST['option_leather_seats']) ? $_POST['option_leather_seats'] : '';
    $_SESSION['option_seat_heating'] = isset($_POST['option_seat_heating']) ? $_POST['option_seat_heating'] : '';
    $_SESSION['option_sunroof'] = isset($_POST['option_sunroof']) ? $_POST['option_sunroof'] : '';

    $_SESSION['customer_name'] = $_POST['customer_name'];
    $_SESSION['customer_phone'] = $_POST['customer_phone'];
    $_SESSION['customer_email'] = $_POST['customer_email'];

    header('Location: bill.php');
    exit;
}
?>

<html>
    <head>
        <title>Работа</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <link href="../css/style.css?v=1" rel="stylesheet" type="text/css">
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
                                                <div style="margin-left:95px ">

                                                <form action="order.php" method="post">

                                                <font class="title">
                                                    Тип услуги
                                                </font>

                                                <br>

                                                <!-- (1-1) Тип услуги -->
                                                <select name="service_type">
                                                    <option value="rental">Прокат</option>
                                                    <option value="sale">Продажа</option>
                                                    <option value="leasing">Лизинг</option>
                                                </select>
                                                    
                                                    
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
                                                        <div style="margin-left:6px; margin-top:7px; "><img src="../images/1_w2.gif"></div>

                                                    <!-- (1-3) Дополнительные опции -->
                                                    <input type="checkbox" name="option_leather_seats" value="50"> Кожаный салон (+50)
                                                        <br>
                                                    <input type="checkbox" name="option_seat_heating" value="30"> Подогрев сидений (+30)
                                                        <br>
                                                    <input type="checkbox" name="option_sunroof" value="100"> Люк (+100)
                                                        <br>

                                                    <td valign="top" height="215" width="1" background="../images/tal.gif" style="background-repeat:repeat-y"></td>
                                                    <td valign="top" height="215" width="243">
                                                        <div style="margin-left:22px; margin-top:2px; "><img src="../images/hl.gif"></div>
                                                        <div style="margin-left:22px; margin-top:7px; "><img src="../images/1_w2.gif"></div>
                                                        <div style="margin-left:22px; margin-top:13px; ">

                                                        <!-- (1-2) Контактные данные -->
                                                        <input type="text" name="customer_name" placeholder="Имя" required>
                                                            <br>
                                                        <input type="text" name="customer_phone" placeholder="Телефон" required>
                                                            <br>
                                                        <input type="email" name="customer_email" placeholder="Почта" required>  
                                                            <br>
                                                         
                                                        </div>
                                                        <div style="margin-left:22px; margin-top:16px; "><img src="../images/hl.gif"></div>
                                                        <div style="margin-left:22px; margin-top:7px; "><img src="../images/1_w4.gif"></div>
                                                        <div style="margin-left:22px; margin-top:9px; ">

                                                        <!-- Кнопка Далее -->
                                                        <input type="submit" name="submit" value="Далее">
                                                    </form>    
                                                            
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
