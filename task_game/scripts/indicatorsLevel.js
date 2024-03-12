async function startIndicatorLevel(hardLevel, levelSettings, globScore){
    return new Promise((resolve, reject) => {
        const currentLevel = hardLevel;
        const lvlSetts = levelSettings;

        var docEls = {
            CountdownTimer:  document.getElementById("countdown-timer"),
            IndicatorGameScreen : document.getElementById("indicator-game-screen"),
            IndicatorScoreText: document.getElementById("indicator-score-text"),
            IndicatorScoreDifference: document.getElementById("indicator-score-difference"),
            ToMenuButton: document.getElementById("back-to-menu-from-indicator")
        }
        
        docEls.ToMenuButton.addEventListener("click", function() {
            endLevel(500);
        });

        var gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
        var timeLeft = lvlSetts.duration; //Счётчик на таймере
        const noMoreCreation = lvlSetts.timeExists.max;
        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        var timerIds = []; //Идентификаторы всех таймеров

        const indicators = document.querySelectorAll('.indicator');
        var availableIndicators = [4, 5, 6];

        if(!globScore){
            var indGameSсore = 0; 
        }
        else{
            var indGameSсore = globScore;
        }
        console.log('ind start' + indGameSсore +"\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);

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

        console.log("Начинаем уровень " + currentLevel);
        console.log(lvlSetts);

        activateIndicator(currentLevel, lvlSetts); // Активируем первый индикатор

        
        
        // Инициализация индикаторов
        function initIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => {
                indicator.textContent = ''; // Очищаем текст
                indicator.classList.remove('clickable');
                indicator.classList.remove('temp-clickable');
                indicator.classList.remove('active');
                indicator.classList.remove('succlicked');

                // Добавляем обработчик клика, если его еще нет
                indicator.onclick = /*indicator.onclick ||*/ indicatorClicked; //Из за этого не переопределялись след. уровни для activateTimer

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

        function checkTime(){
            let chTParts = docEls.CountdownTimer.textContent.split(':'); 

            let chTMinutes = parseInt(chTParts[0], 10);
            let chTSseconds = parseInt(chTParts[1], 10);

            let chTTotalSeconds = (chTMinutes * 60)+chTSseconds;
            return chTTotalSeconds;
        }

        function pushToInds(indicatorArray, intToAdd){
            if(!indicatorArray.includes(intToAdd)){
                indicatorArray.push(intToAdd);
                return indicatorArray;
            }
            console.log("ЗНАЧЕНИЕ УЖЕ ЕСТЬ В МАССИВЕ")
            return indicatorArray;
        }

        function getLvlScore(){
            return parseInt(docEls.IndicatorScoreText.textContent, 10);
        }

        // Функция для активации одного случайного индикатора
        function activateIndicator(currentLevel, lvlSetts, launchAttempt) {
            if(!launchAttempt) launchAttempt = 0;
            console.log("timeLeft:" + timeLeft);
            if(availableIndicators && availableIndicators.length > 0 && launchAttempt < 2 && checkTime() > noMoreCreation)
            {
                console.log();
                console.log("["+availableIndicators.join(", ")+"]===" + "\t\t" + timeLeft);

                //Берём случайный индикатор допустим availableIndicators = [5,6] - названия доступных индикаторов
                const randomIndex = Math.floor(Math.random() * availableIndicators.length); // randomIndex = 1 - индекс индикатора 6
                const selectedIndex = availableIndicators[randomIndex]; // selectedIndex = 6
                const lvlChallenge = currentLevel;
                const localSet = lvlSetts;
                var selectedIndicator;

                indicators.forEach(indN => {
                    if(indN.dataset.tag == selectedIndex) {selectedIndicator = indN;}
                });
                //const selectedIndicator = indicators[availableIndicators.indexOf(selectedIndex)]; //Выбирается индикатор с индексом 2
                
                var s = '-'+ selectedIndex +' (' + randomIndex + ', ' + selectedIndicator.id + ')';
                console.log(s + "\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);

                availableIndicators.splice(randomIndex, 1); //Убираем элемент 2 (с индексом 1) из доступных индикаторов availableIndicators = [0]
                
                console.log("["+availableIndicators.join(", ")+"]==" + "\t\t" + timeLeft);

                const timeoutSeconds = getRandomTimeoutSeconds(localSet.timeExists);
                const timeBetween = getRandomTimeoutSeconds(localSet.timeWaits);

                if(timeoutSeconds == 5){
                    console.log(hardLevel);console.log(levelSettings);
                    console.log(currentLevel);console.log(lvlSetts);
                    console.log(lvlChallenge);console.log(localSet);
                }

                // Устанавливаем время, через которое индикатор станет активным
                activationTimerId = setTimeout(() => {
                    selectedIndicator.textContent = timeoutSeconds; // Отображаем время на индикаторе
                    selectedIndicator.dataset.requiredTime = timeoutSeconds; // Записываем в свойства
                    selectedIndicator.classList.remove('active'); // убрать класс с анимацией провала
                    selectedIndicator.classList.remove('succlicked'); //убрать класс с анимацией удачи
                    selectedIndicator.classList.add('clickable'); // Сделать индикатор кликабельным и активным

                    if(lvlChallenge == 2){
                        selectedIndicator.classList.remove('temp-clickable');
                        selectedIndicator.offsetHeight;
                        selectedIndicator.classList.add('temp-clickable');
                    }

                    console.log("!*"+selectedIndicator.dataset.tag+"*!" +"\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft)
                    playPanel();

                    selectedIndicator.dataset.activationTime = Date.now(); // Запоминаем момент активации

                    // Устанавливаем таймер для "окна для клика"
                    clickWindowTimerId = setTimeout(() => {
                        // Если индикатор все еще кликабелен после окна для клика, игрок проиграл
                        if (selectedIndicator.classList.contains('clickable')) {
                            selectedIndicator.classList.remove('clickable');
                            selectedIndicator.classList.remove('temp-clickable');
                            selectedIndicator.textContent = '';
            
                            //failLevel('2');
                            playFail();

                            selectedIndicator.classList.remove('active');
                            selectedIndicator.offsetHeight;
                            selectedIndicator.classList.add('active');
            
                            var diffScore = -1*Math.floor(indGameSсore/localSet.punishment);
                            indGameSсore = getLvlScore() + diffScore;
                            refreshScore(diffScore, indGameSсore)
            
                            clearTimeout(clickWindowTimerId);
                            clearTimeout(activationTimerId);

                            console.log(">"+parseInt(selectedIndicator.dataset.tag)  + "\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);
                            
                            availableIndicators = pushToInds(availableIndicators, parseInt(selectedIndicator.dataset.tag, 10));
                            
                            console.log("["+availableIndicators.join(", ")+"]"  +"\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);
                            console.log('');

                            if(checkTime() > noMoreCreation && gameDOWNTimer) {
                                activateIndicator(currentLevel, lvlSetts); // Активируем следующий индикатор
                                if(lvlChallenge == 3) {
                                    activateIndicator(currentLevel, lvlSetts);
                                }
                            }
                        }
                    }, (timeoutSeconds + localSet.clickTolerance) * 1000);
                    timerIds.push(clickWindowTimerId);
                    //console.log(clickWindowTimerId);
                }, timeBetween * 1000);
                timerIds.push(activationTimerId);
                //console.log(activationTimerId)
            }
            else{
                launchAttempt++;
                if(availableIndicators.length > 0 && launchAttempt < 2 && checkTime() > noMoreCreation){
                    activateIndicator(currentLevel, lvlSetts, launchAttempt);
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

            var timeMin = parseInt(timeOnIndicator, 10)-parseFloat(lvlSetts.clickTolerance);
            var timeMax = parseInt(timeOnIndicator, 10)+parseFloat(lvlSetts.clickTolerance);

            if (elapsed >= timeMin && elapsed <= timeMax) {
                // Успешный клик
                event.target.classList.remove('clickable');
                event.target.classList.remove('temp-clickable');
                event.target.textContent = '';
                var difficultyNum = 1/parseFloat(lvlSetts.clickTolerance, 10);
                var timeDelta = Math.abs(elapsed-timeOnIndicator);
                
                playSuccess();

                event.target.classList.remove('succlicked');
                event.target.offsetHeight;
                event.target.classList.add('succlicked');
                
                var diffScore = Math.floor((difficultyNum / timeDelta)*100);
                indGameSсore = diffScore + getLvlScore();
                refreshScore(diffScore, indGameSсore)
            } else {
                // Нажатие вне временного окна
                event.target.classList.remove('clickable');
                event.target.classList.remove('temp-clickable');
                event.target.textContent = '';

                //failLevel('1');
                playFail();

                event.target.classList.remove('active');
                event.target.offsetHeight;
                event.target.classList.add('active');

                var diffScore = -1*Math.floor(indGameSсore/lvlSetts.punishment);
                indGameSсore = diffScore + getLvlScore();
                refreshScore(diffScore, indGameSсore)
            }
            console.log(">"+parseInt(event.target.dataset.tag)  +"\t\t" + "—\t\t["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);
            
            availableIndicators = pushToInds(availableIndicators, parseInt(event.target.dataset.tag, 10));
            console.log("["+availableIndicators.join(", ")+"]" + "\t\t" + timeLeft);
            console.log('');

            
            activateIndicator(currentLevel, lvlSetts); // Активируем следующий индикатор
            if(currentLevel == 3) {
                activateIndicator(currentLevel, lvlSetts);
            }
        }

        // Генерация случайного таймаута для индикатора в секундах
        function getRandomTimeoutSeconds(timeout) {
            var randomTime = Math.floor(Math.random() * (timeout.max - timeout.min + 1) + timeout.min);
            console.log("rnd time = " + randomTime);
            return randomTime;
        }

        // Завершение уровня
        async function endLevel(rejectCode) {
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
                    indicator.classList.remove('temp-clickable');
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
                var returnScore = getLvlScore();
                console.log('ind success: ' + returnScore + "\t\t" + timeLeft);

                refreshScore(0, 0);

                docEls.IndicatorScoreDifference.textContent = "0";
                docEls.IndicatorScoreDifference.classList.remove('score-animation');
                docEls.IndicatorScoreDifference.classList.remove('scoreplus');
                docEls.IndicatorScoreDifference.classList.remove('scoreminus');

                console.log("resolve("+returnScore+")");
                if(!rejectCode){
                    resolve(returnScore);
                }
                else{
                    reject(returnScore);
                }
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

