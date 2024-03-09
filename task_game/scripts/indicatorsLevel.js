async function startIndicatorLevel(hardLevel, levelSettings, globScore){
    return new Promise((resolve, reject) => {
        var currentLevel = hardLevel;

        var docEls = {
            CountdownTimer:  document.getElementById("countdown-timer"),
            IndicatorGameScreen : document.getElementById("indicator-game-screen"),
            IndicatorScoreText: document.getElementById("indicator-score-text"),
            IndicatorScoreDifference: document.getElementById("indicator-score-difference")
        }

        var gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
        var timeLeft = levelSettings.duration; //Счётчик на таймере
        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        var timerIds = []; //Идентификаторы всех таймеров
        var availableIndicators = [4, 5, 6];

        if(!globScore){
            var indGameSсore = 0; 
        }
        else{
            var indGameSсore = globScore;
        }
        console.log('ind start' + indGameSсore);

        refreshScore(0, indGameSсore);
        
        var lastUser = getCurrentUser();    
        var activationTimerId; // Идентификатор для таймера активации индикатора
        var clickWindowTimerId; // Идентификатор для таймера "окна для клика"
        const maxGameScore = lastUser.userdata.maxGameScore;

        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
        
        // Показать игровой экран
        docEls.IndicatorGameScreen.style.display = "flex";

        initIndicators(); // Инициализация индикаторов

        console.log("Начинаем уровень " + hardLevel);

        activateIndicator(); // Активируем первый индикатор
        
        // Инициализация индикаторов
        function initIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => {
                indicator.textContent = ''; // Очищаем текст
                indicator.classList.remove('clickable');
                // Добавляем обработчик клика, если его еще нет
                indicator.onclick = indicator.onclick || indicatorClicked;
                switch(indicator.id){
                    case "indicator-1":
                        indicator.dataset.tag = 4;
                        break;
                    case "indicator-2":
                        indicator.dataset.tag = 5;
                        break;
                    case "indicator-3":
                        indicator.dataset.tag = 6;
                        break;
                }
            });
        }

        // Функция обновления таймера обратного отсчёта
        async function updateCountdownTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                docEls.CountdownTimer.textContent = formatTime(timeLeft);
            } 
            else 
            {
                clearInterval(gameDOWNTimer);
                clearTimeout(gameDOWNTimer);
    
                timerIds.forEach(timerId => {
                    clearTimeout(timerId);
                    clearInterval(timerId);
                });
                timerIds = [];

                await endLevel(); // Завершить уровень
            }
        }

        // Форматирование времени для отображения
        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let sec = seconds % 60;
            return minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
        }

        // Функция для активации одного случайного индикатора
        function activateIndicator(launchAttempt) {
            if(!launchAttempt) launchAttempt = 0;

            const indicators = document.querySelectorAll('.indicator');
            if(availableIndicators && availableIndicators.length > 0 && launchAttempt < 2)
            {
                console.log();
                console.log("["+availableIndicators.join(", ")+"]===");
                //Берём случайный индикатор допустим availableIndicators = [5,6] - названия доступных индикаторов
                const randomIndex = Math.floor(Math.random() * availableIndicators.length); // randomIndex = 1 - индекс индикатора 6
                const selectedIndex = availableIndicators[randomIndex]; // selectedIndex = 6
                var selectedIndicator;
                indicators.forEach(indN => {
                    if(indN.dataset.tag == selectedIndex) {selectedIndicator = indN;}
                });
                //const selectedIndicator = indicators[availableIndicators.indexOf(selectedIndex)]; //Выбирается индикатор с индексом 2
                var s = '-'+ selectedIndex +' (' + randomIndex + ', ' + selectedIndicator.id + ')';
                console.log(s);

                availableIndicators.splice(randomIndex, 1); //Убираем элемент 2 (с индексом 1) из доступных индикаторов availableIndicators = [0]
                
                console.log("["+availableIndicators.join(", ")+"]==");

                const timeoutSeconds = getRandomTimeoutSeconds(levelSettings.indicatorTimeout);
                const timeBetween = getRandomTimeoutSeconds(levelSettings.indicatorDifference);

                // Устанавливаем время, через которое индикатор станет активным
                activationTimerId = setTimeout(() => {
                    selectedIndicator.textContent = timeoutSeconds; // Отображаем время на индикаторе
                    selectedIndicator.dataset.requiredTime = timeoutSeconds; // Записываем в свойства
                    selectedIndicator.classList.remove('active'); // убрать класс с анимацией провала
                    selectedIndicator.classList.remove('succlicked'); //убрать класс с анимацией удачи
                    selectedIndicator.classList.add('clickable'); // Сделать индикатор кликабельным и активным
                    console.log("!*"+selectedIndicator.dataset.tag+"*!")
                    playPanel();

                    selectedIndicator.dataset.activationTime = Date.now(); // Запоминаем момент активации

                    // Устанавливаем таймер для "окна для клика"
                    clickWindowTimerId = setTimeout(() => {
                        // Если индикатор все еще кликабелен после окна для клика, игрок проиграл
                        if (selectedIndicator.classList.contains('clickable')) {
                            selectedIndicator.classList.remove('clickable');
                            selectedIndicator.textContent = '';
            
                            //failLevel('2');
                            playFail();

                            selectedIndicator.classList.remove('active');
                            selectedIndicator.offsetHeight;
                            selectedIndicator.classList.add('active');
            
                            var diffScore = -1*Math.floor(indGameSсore/levelSettings.punishment);
                            indGameSсore += diffScore;
                            refreshScore(diffScore, indGameSсore)
            
                            clearTimeout(clickWindowTimerId);
                            clearTimeout(activationTimerId);

                            console.log(">"+parseInt(selectedIndicator.dataset.tag));
                            availableIndicators.push(parseInt(selectedIndicator.dataset.tag));
                            console.log("["+availableIndicators.join(", ")+"]");
                            console.log('');

                            if(timeLeft > levelSettings.indicatorTimeout.max && gameDOWNTimer) {
                                activateIndicator(); // Активируем следующий индикатор
                                if(currentLevel == 3) {
                                    activateIndicator();
                                }
                            }
                        }
                    }, (timeoutSeconds + levelSettings.clickTolerance) * 1000);
                    timerIds.push(clickWindowTimerId);
                    //console.log(clickWindowTimerId);
                }, timeBetween * 1000);
                timerIds.push(activationTimerId);
                //console.log(activationTimerId)
            }
            else{
                launchAttempt++;
                if(availableIndicators.length > 0 && launchAttempt < 2 && timeLeft > levelSettings.indicatorTimeout.max){
                    activateIndicator(launchAttempt);
                    //console.log("попытка запуска " + launchAttempt);
                }
                else{
                    return;
                    //console.log("перебор");
                }
            }
        }

        // Обработка клика по индикатору
        function indicatorClicked(event) {
            if (!event.target.classList.contains('clickable')) {
                return; // Индикатор не готов к нажатию
            }

            var timeOnIndicator = event.target.dataset.requiredTime;

            const currentTime = parseInt(Date.now(), 10);
            const activationTime = parseInt(event.target.dataset.activationTime, 10);
            const elapsed = (currentTime - activationTime) / 1000; // Время в секундах с момента активации

            var timeMin = parseInt(timeOnIndicator, 10)-parseFloat(levelSettings.clickTolerance);
            var timeMax = parseInt(timeOnIndicator, 10)+parseFloat(levelSettings.clickTolerance);

            if (elapsed >= timeMin && elapsed <= timeMax) {
                // Успешный клик
                event.target.classList.remove('clickable');
                event.target.textContent = '';
                var difficultyNum = 1/parseFloat(levelSettings.clickTolerance, 10);
                var timeDifference = Math.abs(elapsed-timeOnIndicator);
                
                playSuccess();

                event.target.classList.remove('succlicked');
                event.target.offsetHeight;
                event.target.classList.add('succlicked');
                
                var diffScore = Math.floor((difficultyNum / timeDifference)*100);
                indGameSсore += diffScore;
                refreshScore(diffScore, indGameSсore)
            } else {
                // Нажатие вне временного окна
                event.target.classList.remove('clickable');
                event.target.textContent = '';

                //failLevel('1');
                playFail();

                event.target.classList.remove('active');
                event.target.offsetHeight;
                event.target.classList.add('active');

                var diffScore = -1*Math.floor(indGameSсore/levelSettings.punishment);
                indGameSсore += diffScore;
                refreshScore(diffScore, indGameSсore)

            }
            console.log(">"+parseInt(event.target.dataset.tag));
            availableIndicators.push(parseInt(event.target.dataset.tag));
            console.log("["+availableIndicators.join(", ")+"]");
            console.log('');

            if(timeLeft > 0 && gameDOWNTimer){
                activateIndicator(); // Активируем следующий индикатор
                if(currentLevel == 3 && timeLeft > levelSettings.indicatorTimeout.max && gameDOWNTimer) {
                    activateIndicator();
                }
            }
        }

        // Генерация случайного таймаута для индикатора в секундах
        function getRandomTimeoutSeconds(timeout) {
            return Math.floor(Math.random() * (timeout.max - timeout.min + 1) + timeout.min);
        }

        // Завершение уровня
        async function endLevel() {
            //alert('Уровень ' + currentLevel + ' пройден!');
            timeLeft = 0;

            clearInterval(gameDOWNTimer);
            clearTimeout(gameDOWNTimer);

            timerIds.forEach(timerId => {
                clearTimeout(timerId);
                clearInterval(timerId);
            });
            timerIds = [];

            const indicatorsContainer = document.querySelectorAll('.indicator');
            indicatorsContainer.forEach(indicator => {
                if(indicator.classList.length > 0)
                {
                    indicator.classList.remove('clickable');
                    indicator.classList.remove('active');
                    indicator.classList.remove('succlicked');
                    indicator.textContent = '';
                    indicator.style.clear;
                }

                indicator.dataset.activationTime = '';
                indicator.dataset.requiredTime = '';
                indicator.textContent = '';
                delete indicator.dataset;
                indicator.dataset.clear;
            });

            playLevel();

            setTimeout(() => {
                docEls.IndicatorGameScreen.style.display = "none";
                resolve(indGameSсore);
                console.log('ind success' + indGameSсore);

                indGameSсore = 0;
                docEls.IndicatorScoreText.textContent = "0".repeat(12-indGameSсore.toString().length) + indGameSсore.toString();

                
                docEls.IndicatorScoreDifference.textContent = "0";
                docEls.IndicatorScoreDifference.classList.remove('score-animation');
                docEls.IndicatorScoreDifference.classList.remove('scoreplus');
                docEls.IndicatorScoreDifference.classList.remove('scoreminus');
            }, 2000);
        }

        function refreshScore(diffScore, Score){
            docEls.IndicatorScoreText.textContent = "0".repeat(12-Score.toString().length) + Score.toString();
            docEls.IndicatorScoreDifference.textContent = diffScore.toString();
            if(diffScore > 0){
                docEls.IndicatorScoreDifference.classList.remove('scoreplus');
                docEls.IndicatorScoreDifference.classList.remove('scoreminus');
                docEls.IndicatorScoreDifference.classList.add('scoreplus');
            }
            else if(diffScore < 0){
                docEls.IndicatorScoreDifference.classList.remove('scoreplus');
                docEls.IndicatorScoreDifference.classList.remove('scoreminus');
                docEls.IndicatorScoreDifference.classList.add('scoreminus');
            }
            else{
                docEls.IndicatorScoreDifference.classList.remove('scoreplus');
                docEls.IndicatorScoreDifference.classList.remove('scoreminus');
            }


            docEls.IndicatorScoreDifference.classList.remove('score-animation');
            docEls.IndicatorScoreDifference.offsetHeight;
            docEls.IndicatorScoreDifference.classList.add('score-animation');
        }

    });
}

