<?php
session_start();

$service_type = $_SESSION['service_type'];

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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

   $_SESSION['car_brand'] = $_POST['car_brand'];

   if ($service_type == 'rental' || $service_type == 'leasing') {
      $_SESSION['rental_days'] = $_POST['rental_days'];
   } elseif ($service_type == 'sale') {
         $_SESSION['fast_processing'] = isset($_POST['fast_processing']) ? 'yes' : 'no';
   }

   $preps = $serviceTypes[$service_type]['pred_podgotovka'];
   foreach ($preps as $key => $prep) {
       if (isset($_POST[$key])) {
           $_SESSION[$key] = $_POST[$key];  // сохранение в сессию
       } else {
           $_SESSION[$key] = 'off';  // если чекбокс не был отмечен
       }
   }

   header('Location: basket.php');
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
               <div style="margin-left:88px; margin-top:57px "><img src="../images/w1.gif"></div>

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

               </div>
               <div style="margin-left:400px; margin-top:10px "></div>       
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
                                    <font class="title">   
                                       Марка машины
                                    </font>

                                    <form action="bill.php" method="post">

                                    <!-- (2-1) Марка машины -->
                                    <?php
                                    $marks = $serviceTypes[$service_type]['mark'];

                                    foreach ($marks as $markName => $markPrice) {
                                       echo '<label>';
                                       echo '<input type="radio" name="car_brand" value="' . $markName . '"> ' . $markName . ' (+' . $markPrice . ')';
                                       echo '</label>';
                                    }
                                    ?>

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
                                          <div style="margin-left:6px; margin-top:11px; margin-right:0px ">
                                             <font class="title"> 
                                                <?php echo $serviceTypes[$service_type]['pred_name']; ?>
                                             </font>
                                          </div>
                                          <div style="margin-top:10px; margin-left:6px ">
                                           

                                          <!-- (2-2) Предварительная подготовка -->
                                          <?php
                                          $preps = $serviceTypes[$service_type]['pred_podgotovka']; 

                                          foreach ($preps as $key => $prep) {
                                             echo '<label>';
                                             echo '<input type="checkbox" name="' . $key . '" value="on"' . (isset($_SESSION[$key]) && $_SESSION[$key] === 'on' ? ' checked' : '') . '> ' . $prep['name'] . ' (+' . $prep['price'] . ')';
                                             echo '</label>';
                                          }
                                          ?>

                                          </div>
                                          <div style="margin-top:6px; margin-left:6px ">
                                            
                                          </div>
                                          <div style="margin-top:6px; margin-left:6px ">
                                           
                                          </div> 
                                          <div style="margin-top:6px; margin-left:6px ">
                                            
                                          </div> 
                                          <div style="margin-top:6px; margin-left:6px ">
                                            
                                          </div> 
                                          <div style="margin-top:6px; margin-left:6px ">
                                          
                                          </div> 

                                       <td valign="top" height="215" width="1" background="../images/tal.gif" style="background-repeat:repeat-y"></td>
                                       <td valign="top" height="215" width="243">
                                          <div style="margin-left:22px; margin-top:2px; "><img src="../images/hl.gif"></div>
                                          <div style="margin-left:22px; margin-top:7px; ">
                                             <!-- (2-3) Поле количество дней или флажок для продажи -->
                                             <?php if ($service_type == 'rental' || $service_type == 'leasing'): ?>
                                             <input class="textLabel" type="number" name="rental_days" placeholder="Количество дней" min="0" required>
                                                <br>
                                                <img src="../images/1_w2.gif">
                                                <br>
                                             <?php elseif ($service_type == 'sale'): ?>
                                             <label>
                                                <input type="checkbox" name="fast_processing" value="yes"> "Ускоренное оформление"
                                             </label>
                                                <br>
                                                <img src="../images/1_w2.gif">
                                                <br>
                                             <?php endif; ?>
                                          </div>

                                          <div style="margin-left:22px; margin-top:13px; ">

                                             <div style="margin-left:0px; margin-top:0px; margin-right:0px "><font class="title">   </font></div>
                                          <div style="margin-top:6px; margin-left:6px ">
                                            
                                          </div> 
                                          <div style="margin-top:6px; margin-left:6px ">
                                             
                                          </div>
                                          <div style="margin-top:6px; margin-left:6px ">
                                             
                                          </div>

                                             <div style="margin-left:67px; margin-top:7px; margin-right:10px "><img src="../images/pointer.gif"><a href="#"><img src="../images/read_more.gif" border="0"></a></div>
                                          </div>
                                          <div style="margin-left:22px; margin-top:16px; "><img src="../images/hl.gif"></div>
                                          <div style="margin-left:22px; margin-top:7px; "><img src="../images/1_w4.gif"></div>
                                          <div style="margin-left:22px; margin-top:9px; ">
                                             <img src="../images/1_p3.gif" align="left">
                                         

    
                                             
                                             
                                             <div style="margin-left:67px; margin-top:0px; margin-right:0px ">
                                       <font class="title">
                                             <!-- Кнопки Вернуться назад и Далее -->
                                             <button type="button" onclick="history.back();">Вернуться назад</button>
                                             <input type="submit" name="submit" value="Далее">
                                          </form>
                                       </font><br>
<div> </div>                     
                                             <div style="margin-left:0px; margin-top:7px; margin-right:10px "><img src="../images/pointer.gif"><a href="#"><img src="../images/read_more.gif" border="0"></a></div>
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
