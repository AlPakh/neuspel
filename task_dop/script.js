document.addEventListener('DOMContentLoaded', function() {
    //инициализация и получение размеров контейнера.
    const content = document.getElementById('content-div');
    const contentRect = content.getBoundingClientRect();
    const contentWidth = contentRect.width;
    const contentHeight = contentRect.height;
  
    //раскидываем картинки по контейнеру в случайные позиции и в случайные положения
    const pieces = document.querySelectorAll('.puzzle-piece');

    function areClose(piece1, piece2) {
        var thresholdX, thresholdY; // допустимое расстояние для сцепления
        var specCheck = false; //спецпроверка для элементов, удалённых от центра по вертикали

        //Для каждой пары картинок устанавливается своя погрешность примагничивания
        if(piece1.dataset.cposition == "1" && piece2.dataset.cposition == "3" || 
                piece1.dataset.cposition == "3" && piece2.dataset.cposition == "1" ||  
                piece1.dataset.cposition == "1" && piece2.dataset.cposition == "5" || 
                piece1.dataset.cposition == "5" && piece2.dataset.cposition == "1" || 
                piece1.dataset.cposition == "3" && piece2.dataset.cposition == "5" || 
                piece1.dataset.cposition == "5" && piece2.dataset.cposition == "3") 
        {
            //ноги-руки-уши между собой магнититься не будут
            thresholdX = 0; 
            thresholdY = 0;
        }
        else if (piece1.dataset.cposition == "2" && piece2.dataset.cposition == "4" || 
        piece1.dataset.cposition == "4" && piece2.dataset.cposition == "2")
        {
            //тело и лицо
            thresholdX = 15;
            thresholdY = 15;
        }
        else if (piece1.dataset.cposition == "3" && piece2.dataset.cposition == "4" || 
        piece1.dataset.cposition == "4" && piece2.dataset.cposition == "3" ||
        piece1.dataset.cposition == "3" && piece2.dataset.cposition == "2" || 
        piece1.dataset.cposition == "2" && piece2.dataset.cposition == "3")
        {
            //тело и руки, лицо и руки
            thresholdX = 15;
            thresholdY = 40;
            //specCheck = true; //центр тела и центр глад д.б. выше центра изображения рук
        }
        else if (piece1.dataset.cposition == "1" && piece2.dataset.cposition == "4" || 
        piece1.dataset.cposition == "4" && piece2.dataset.cposition == "1") 
        {
            //тело и уши
            thresholdX = 15;
            thresholdY = 85;
            specCheck = true;
        }
        else if (
        piece1.dataset.cposition == "4" && piece2.dataset.cposition == "5" || 
        piece1.dataset.cposition == "5" && piece2.dataset.cposition == "4") 
        {
            //тело и ноги
            thresholdX = 15;
            thresholdY = 120;
            specCheck = true;

        }
        else 
        {
            thresholdX = 50;
            thresholdY = 50;
        }

        //Получаем координаты границ объектов
        var rect1 = piece1.getBoundingClientRect();
        var rect2 = piece2.getBoundingClientRect();

        //получаем угля, на которые фигуры повёрнуты (чтобы корректно вычислялась середина для нужного поворота)
        var r1 = piece1.dataset.rotation;
        var r2 = piece2.dataset.rotation;

        // находим половину измерения каждого объекта, чтобы сравнивать расстояние между их центрами
        var shirina1 = (piece1.width*Math.cos(r1) + piece1.height*Math.sin(r1))/2;
        var visota1 = (piece1.width*Math.sin(r1) + piece1.height*Math.cos(r1))/2;
        var shirina2 = (piece2.width*Math.cos(r2) + piece2.height*Math.sin(r2))/2;
        var visota2 = (piece2.width*Math.sin(r2) + piece2.height*Math.cos(r2))/2;

        //спецпроверка: в остальной функции проверяется совпадение по координатам в области центра с некоей погрешностью по осям
        //для элементов ушей и ног погрешность большая, т.к. они дальше от центра тела. Проверка нужна, чтобы ноги не считались
        //корректными на голове, а уши не засчитывались на позиции ног
        if(specCheck && ((piece1.dataset.cposition == 1 && rect1.y + visota1 < rect2.y + visota2) || 
                        (piece2.dataset.cposition == 1 && rect1.y + visota1 > rect2.y + visota2)))
        {
            specCheck = false;
        }
        if(specCheck && ((piece1.dataset.cposition == 5 && rect1.y + visota1 > rect2.y + visota2) || 
        (piece2.dataset.cposition == 5 && rect1.y + visota1 < rect2.y + visota2)))
        {
            specCheck = false;
        }
        //елси одна картинка в сравнении - лицо или тело, а другое - руки, руки должны быть ниже (значение 'y' д.б. больше, чем у другого куска)
        if(specCheck && ( 
            ((piece2.dataset.cposition == 2 || piece2.dataset.cposition == 4) && piece1.dataset.cposition == 3 && rect1.y + visota1 > rect2.y + visota2) || 
            ((piece1.dataset.cposition == 2 || piece1.dataset.cposition == 4) && piece2.dataset.cposition == 3 && rect1.y + visota1 < rect2.y + visota2)
        ))
        {
            specCheck = false;
        }

        //проверка, что координаты центров находятся близко
        var b1 = Math.abs((rect1.x + shirina1) - (rect2.x + shirina2)) < thresholdX;
        var b2 = Math.abs((rect1.y + visota1) - (rect2.y + visota2)) < thresholdY;

        /*if(b1 && b2 && r1 == r2 && !specCheck)  
            alert(Math.abs((rect1.x + shirina1) - (rect2.x + shirina2)) + '   ' + 
                Math.abs((rect1.y + visota1) - (rect2.y + visota2)) + '   ' + piece1.dataset.cposition + 
                '   ' + piece2.dataset.cposition + '   ' + thresholdX  + thresholdY);*/ //для душевного спокойствия

        //координаты совпадают, не австралийцы, ноги не на лбу
        return b1 && b2 && r1 == 0 && r1 == r2 && !specCheck;
    }

    function endGame() {
        var bodyPiece = document.querySelector('.puzzle-piece[data-cposition="4"]');
        var sch = 0; //счётчик

        //Для проверки соединений достаточно сравнить все картинки с телом 
        pieces.forEach(piece => {
            if(piece != bodyPiece)
            {
                if(areClose(bodyPiece, piece)) sch += 1;
            }
        });

        if(sch >= 4) //если все четыре части тела на месте, игра окончена
        {
            pieces.forEach(piece => {
                piece.style.pointerEvents = 'none';
            });
            
            //делаем анимацию
            document.querySelector('.puzzle-piece[data-cposition="2"]').src = "src/2_face.gif";
            document.querySelector('.puzzle-piece[data-cposition="3"]').src = "src/3_hands.gif";
        }
    }

    pieces.forEach(piece => {
        //определяем границы контейнера с учётом margain и возможных вылетов картинок за пределы контейнера  
        const randomX = Math.random() * (contentWidth - Math.max(piece.clientWidth, piece.clientHeight) - 30) + 30;
        const randomY = Math.random() * (contentHeight - Math.max(piece.clientWidth, piece.clientHeight) - 150) + 130;
        //набор углов для случайного поворота
        const randomRotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];

        //раскидали куски случайно по контейнеру
        piece.style.position = 'absolute';
        piece.style.left = `${randomX}px`;
        piece.style.top = `${randomY}px`;

        //добавление события нажатия для поворота
        let rotation = randomRotation;
        piece.dataset.rotation = randomRotation;            //чтобы потом можно былосмотреть угол поворота при расчёте координат
        piece.style.transform = `rotate(${rotation}deg)`;

        if (window.matchMedia("(pointer: coarse)").matches) {   //touchscreen
            piece.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Предотвратить стандартное поведение скроллинга
        
                // Рассчитываем начальное смещение, используя первое касание
                var touch = e.touches[0];    // Получаем текущее касание
                const startX = touch.clientX - parseFloat(piece.style.left);
                const startY = touch.clientY - parseFloat(piece.style.top);
        
                function touchMoveHandler(e) {
                    var touch = e.touches[0];
                    const newX = touch.clientX - startX;
                    const newY = touch.clientY - startY;
        
                    piece.style.left = `${newX}px`;
                    piece.style.top = `${newY}px`;
                }
        
                function touchEndHandler() {
                    document.removeEventListener('touchmove', touchMoveHandler);
                    document.removeEventListener('touchend', touchEndHandler);

                    endGame(); //проверка, все ли фигуры на месте
                }
        
                document.addEventListener('touchmove', touchMoveHandler);
                document.addEventListener('touchend', touchEndHandler);
            });

            function detectDoubleTapClosure() {
                let lastTap = 0;
                let timeout;
                return function detectDoubleTap(event) {
                  const curTime = new Date().getTime();
                  const tapLen = curTime - lastTap;
                  if (tapLen < 400 && tapLen > 0) {
                    event.preventDefault();
                    rotation = (rotation + 90) % 360;
                    piece.dataset.rotation = rotation;
                    piece.style.transform = `rotate(${rotation}deg)`;
                  } 
                  else {
                    timeout = setTimeout(() => {
                      clearTimeout(timeout);
                    }, 400);
                  }
                  lastTap = curTime;
                };
              }

            //добавления события двойного клика для поворота
            piece.addEventListener('touchend', detectDoubleTapClosure());
        }
        else{
            //добавления события двойного клика для поворота
            piece.addEventListener('dblclick', function() {
                rotation = (rotation + 90) % 360;
                piece.dataset.rotation = rotation;
                piece.style.transform = `rotate(${rotation}deg)`;
            });
    
            //добавления события удержания для перетаскивания
            piece.addEventListener('mousedown', function(e) {
                e.preventDefault();
                const startX = e.clientX - parseFloat(piece.style.left); //учитываем располож-е относительно родителя
                const startY = e.clientY - parseFloat(piece.style.top);
    
                function mouseMoveHandler(e) {
                    const newX = e.clientX - startX;
                    const newY = e.clientY - startY;
        
                    piece.style.left = `${newX}px`;
                    piece.style.top = `${newY}px`;
                }
    
                function mouseUpHandler() {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);

                    endGame(); //проверка, все ли фигуры на месте
                }
    
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            });
        }
    });

    //Удаление окна инструкции по нажатию на облать окна
    document.querySelector('.okno').addEventListener('click', function() {
        document.getElementById('okno').style.display = 'none';
    });

    //Показать окно с инструкцией
    document.getElementById('okno').style.display = 'flex';
});

