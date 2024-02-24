async function startIndicatorLevel(hardLevel, levelSettings, globScore){
    return new Promise((resolve, reject) => {
        var currentLevel = hardLevel;
        var gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
        var timeLeft = levelSettings.duration; //Счётчик на таймере
        document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
        var timerIds = []; //Идентификаторы всех таймеров

        if(!globScore){
            var gameScore = 0; 
        }
        else{
            gameScore = globScore;
        }
        document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();                             
        
        var lastUser = getCurrentUser();    
        var activationTimerId; // Идентификатор для таймера активации индикатора
        var clickWindowTimerId; // Идентификатор для таймера "окна для клика"
        const maxGameScore = lastUser.userdata.maxGameScore;

        document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
        gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
        
        // Показать игровой экран
        document.getElementById("indicator-game-screen").style.display = "flex";

        initIndicators(); // Инициализация индикаторов

        activateIndicator(); // Активируем первый индикатор
        console.log("Начинаем уровень " + hardLevel);
        
        // Инициализация индикаторов
        function initIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => {
                indicator.textContent = ''; // Очищаем текст
                indicator.classList.remove('active', 'clickable');
                // Добавляем обработчик клика, если его еще нет
                indicator.onclick = indicator.onclick || indicatorClicked;
            });
        }

        // Функция обновления таймера обратного отсчёта
        async function updateCountdownTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
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

        // Функция для активации одного случайного индикатора
        function activateIndicator() {
            const indicators = document.querySelectorAll('.indicator');
            const randomIndex = Math.floor(Math.random() * indicators.length);
            const selectedIndicator = indicators[randomIndex];
            
            const timeoutSeconds = getRandomTimeoutSeconds(currentLevel);
            // Устанавливаем время, через которое индикатор станет активным
            if(!selectedIndicator.classList.contains('clickable') && selectedIndicator.textContent == '')
            {
                activationTimerId = setTimeout(() => {
                    selectedIndicator.textContent = timeoutSeconds; // Отображаем время на индикаторе
                    selectedIndicator.dataset.requiredTime = timeoutSeconds; // Записываем в свойства
                    selectedIndicator.classList.add('clickable', 'active'); // Сделать индикатор кликабельным и активным
                    selectedIndicator.dataset.activationTime = Date.now(); // Запоминаем момент активации
                    if(currentLevel == 3) {activateIndicator();}

                    // Устанавливаем таймер для "окна для клика"
                    clickWindowTimerId = setTimeout(() => {
                        // Если индикатор все еще кликабелен после окна для клика, игрок проиграл
                        if (selectedIndicator.classList.contains('clickable')) {
                            selectedIndicator.classList.remove('clickable', 'active');
                            failLevel(2);
                        }
                    }, (timeoutSeconds + levelSettings.clickTolerance) * 1000);
                    timerIds.push(clickWindowTimerId);
                    console.log(clickWindowTimerId);
                }, timeoutSeconds * 1000);
                timerIds.push(activationTimerId);
                console.log(activationTimerId)
            }

        }

        // Обработка клика по индикатору
        async function indicatorClicked(event) {
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
                event.target.classList.remove('clickable', 'active');
                event.target.textContent = '';
                var difficultyNum = 1/parseFloat(levelSettings.clickTolerance, 10);
                var timeDifference = Math.abs(elapsed-timeOnIndicator);
                gameScore += Math.floor((difficultyNum / timeDifference)*50);
                document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
                activateIndicator(); // Активируем следующий индикатор
            } else {
                // Нажатие вне временного окна
                await failLevel('1');
            }
        }

        // Генерация случайного таймаута для индикатора в секундах
        function getRandomTimeoutSeconds() {
            let timeout = levelSettings.indicatorTimeout;
            return Math.floor(Math.random() * (timeout.max - timeout.min + 1) + timeout.min);
        }

        // Завершение уровня
        async function endLevel() {
            alert('Уровень ' + currentLevel + ' пройден!');
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
                    indicator.classList.remove('active', 'clickable');
                }
                indicator.dataset.activationTime = '';
                indicator.dataset.requiredTime = '';
                indicator.textContent = '';
                delete indicator.dataset;
            });

            setTimeout(() => {
                document.getElementById("indicator-game-screen").style.display = "none";
                resolve(gameScore);

                gameScore = 0;
                document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
            }, 2000);
        }

        // Если игрок не успевает кликнуть на индикатор
        async function failLevel(a) {
            alert('Код проигрыша '+ a);
            await resetGame(a);
        }

        // Функция для сброса игры или подготовки к новой игре
        async function resetGame(a) {
            // Скрыть игровой экран и очистить все таймеры и данные
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
                        indicator.classList.remove('active', 'clickable');
                        indicator.textContent = '';
                    }
                    indicator.dataset.remove;
                });

                if(!maxGameScore || maxGameScore < gameScore){
                    lastUser.userdata.maxGameScore = gameScore;
                    changeUser(lastUser);
                }

                setTimeout(() => {
                    document.getElementById("indicator-game-screen").style.display = "none";
                    reject(gameScore);

                    gameScore = 0;
                    document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
                }, 2000);
            
        }

    });
}

