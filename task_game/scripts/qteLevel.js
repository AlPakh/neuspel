async function startQTELevel(hardLevel, levelSettings, globScore){
    return new Promise((resolve, reject) => {
        var currentLevel = hardLevel;

        var docEls = {
            CountdownTimer:  document.getElementById("qte-countdown-timer"),
            QTEGameScreen : document.getElementById("qte-game-screen"),
            QTEScoreText: document.getElementById("qte-score-text"),
            QTEScoreDifference: document.getElementById("qte-score-difference")
        }

        var gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
        var timeLeft = levelSettings.duration; //Счётчик на таймере
        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        var timerIds = []; //Идентификаторы всех таймеров
        
        if(!globScore){
            var qteGameScore = 0; 
        }
        else{
            var qteGameScore = globScore;
        }
        console.log('qte start' + qteGameScore);

        refreshScore(0, qteGameScore);
                                                            
        var lastUser = getCurrentUser();    
        let canPressKeys = true;
        var activationTimerId;
        var clickWindowTimerId; // Идентификатор для таймера "окна для клика"
        
        const maxGameScore = lastUser.userdata.maxGameScore;

        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
        
        // Показать игровой экран
        docEls.QTEGameScreen.style.display = "flex";

        activateTimer();

        console.log("Начинаем уровень " + hardLevel);
        
        // Функция обновления таймера обратного отсчёта
        async function updateCountdownTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                docEls.CountdownTimer.textContent = formatTime(timeLeft);
            } 
            else 
            {
                clearInterval(gameDOWNTimer);
                await endLevel(); // Завершить уровень
            }
        }

        // Форматирование времени для отображения
        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let sec = seconds % 60;
            return minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
        }

        let panel;

        function handleKeyDown(e) {
            if (!panel) return; // Если panel не определен, выходим из функции
            if (e.key === panel.textContent) {
                const currentTime = parseFloat(Date.now(), 10);
                const activationTime = parseFloat(panel.dataset.activationTime, 10);
                const elapsed = (currentTime - activationTime) / 1000;
        
                var difficultyNum = 1/parseFloat(levelSettings.clickTolerance, 10);
                var timeDifference = Math.abs(elapsed);
        
                var diffScore = Math.floor((difficultyNum / timeDifference)*3000);
                qteGameScore += diffScore;
                refreshScore(diffScore, qteGameScore)
        
                playSuccess();
        
                panel.remove();
                clearTimeout(activationTimerId);
                clearTimeout(finishTimerId);
                if(timeLeft > levelSettings.indicatorTimeout.max){
                    activateTimer(); // Запуск нового таймера
                }
            }
            else{
                panel.style.backgroundColor = "red";
                canPressKeys = false;
                console.log('wrong num');
            }
        }

        function activateTimer() {
            canPressKeys = true;
            const timeoutSeconds = getRandomTimeoutSeconds(currentLevel);
            const number = Math.floor(Math.random() * 10); // Генерация числа от 0 до 9
            
            activationTimerId = setTimeout(() => {
                const container = document.getElementById('qte-game-objects-container');

                panel = document.createElement('div');
                panel.textContent = number; // Установка текста панельки
                panel.classList.add('panel');
                //console.log(canPressKeys);
                //console.log();

                playPanel();

                panel.style.left = `${(Math.random() * (container.offsetWidth - 240))+120}px`; // Случайная позиция по X
                panel.style.top = `${(Math.random() * (container.offsetHeight - 150)+75)}px`; // Случайная позиция по Y

                console.log(panel.style.left + " " + panel.style.top);
                console.log((container.offsetWidth - 50) + " " + ((container.offsetHeight - 150)+50));

                if(currentLevel >= 2){
                    var animations = ["none", "moveClockwise1 5s linear infinite", "moveCounterclockwise1 5s linear infinite",
                        "none", "moveClockwise2 5s linear infinite", "moveCounterclockwise2 5s linear infinite"
                    ];
                    var randomAnimation = Math.floor(Math.random() * animations.length);
                    panel.style.animation = animations[randomAnimation];
                }

                panel.dataset.activationTime = Date.now(); // Записываем в свойства
                container.appendChild(panel);
                canPressKeys = true;
            
                // Обработка нажатия соответствующей клавиши
                document.addEventListener('keydown', handleKeyDown, { once: true }); // Обработчик события будет удалён после первого выполнения

                finishTimerId = setTimeout(() => {
                    panel.style.backgroundColor = "red";
                    panel.style.pointerEvents = "none";
                    canPressKeys = false;
                    //console.log('time');

                    clearTimeout(finishTimerId);
                    //failLevel(2);
                    playFail();

                    document.removeEventListener('keydown', handleKeyDown) //Здесь я хочу удалить событие нажатия на кнопку
                    
                    panel.remove();
                    clearTimeout(activationTimerId);
                    clearTimeout(finishTimerId);
                    activateTimer(); // Запуск нового таймера
                    
                    var diffScore = -1*Math.floor(qteGameScore/levelSettings.punishment);
                    qteGameScore += diffScore;
                    refreshScore(diffScore, qteGameScore);

                }, levelSettings.clickTolerance * 1000);
                timerIds.push(finishTimerId);
                //console.log(finishTimerId)

            }, timeoutSeconds * 1000);
            timerIds.push(activationTimerId);
            //console.log(activationTimerId)
        }

        // Генерация случайного таймаута для индикатора в секундах
        function getRandomTimeoutSeconds() {
            let timeout = levelSettings.indicatorTimeout;
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

            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => {
                delete panel.dataset;
                document.getElementById('qte-game-objects-container').removeChild(panel);
            });

            playLevel();

            setTimeout(() => {
                docEls.QTEGameScreen.style.display = "none";
                resolve(qteGameScore);
                console.log('qte success' + qteGameScore);

                qteGameScore = 0;
                docEls.QTEScoreText.textContent = "0".repeat(12-qteGameScore.toString().length) + qteGameScore.toString();
            }, 2000);
        }

        function refreshScore(diffScore, Score){
            docEls.QTEScoreText.textContent = "0".repeat(12-Score.toString().length) + Score.toString();
            docEls.QTEScoreDifference.textContent = diffScore.toString();
            if(diffScore > 0){
                docEls.QTEScoreDifference.classList.remove('scoreplus');
                docEls.QTEScoreDifference.classList.remove('scoreminus');
                docEls.QTEScoreDifference.classList.add('scoreplus');
            }
            else if(diffScore < 0){
                docEls.QTEScoreDifference.classList.remove('scoreplus');
                docEls.QTEScoreDifference.classList.remove('scoreminus');
                docEls.QTEScoreDifference.classList.add('scoreminus');
            }
            else{
                docEls.QTEScoreDifference.classList.remove('scoreplus');
                docEls.QTEScoreDifference.classList.remove('scoreminus');
            }


            docEls.QTEScoreDifference.classList.remove('score-animation');
            docEls.QTEScoreDifference.offsetHeight;
            docEls.QTEScoreDifference.classList.add('score-animation');
        }

    });
}

