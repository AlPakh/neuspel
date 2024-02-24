async function startQTELevel(hardLevel, levelSettings, globScore){
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
        let canPressKeys = true;
        var activationTimerId;
        var clickWindowTimerId; // Идентификатор для таймера "окна для клика"
        
        const maxGameScore = lastUser.userdata.maxGameScore;

        document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
        gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
        
        // Показать игровой экран
        document.getElementById("qte-game-screen").style.display = "flex";

        activateTimer();

        console.log("Начинаем уровень " + hardLevel);
        
        // Функция обновления таймера обратного отсчёта
        async function updateCountdownTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById("qte-countdown-timer").textContent = formatTime(timeLeft);
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

        function activateTimer() {
            const timeoutSeconds = getRandomTimeoutSeconds(currentLevel);
            const number = Math.floor(Math.random() * 10); // Генерация числа от 0 до 9
            
            activationTimerId = setTimeout(() => {
                const container = document.getElementById('qte-game-objects-container');

                const panel = document.createElement('div');
                panel.textContent = number; // Установка текста панельки
                panel.classList.add('panel');
                panel.style.left = `${Math.random() * (container.offsetWidth - 50)}px`; // Случайная позиция по X
                panel.style.top = `${(Math.random() * (container.offsetHeight - 100)+50)}px`; // Случайная позиция по Y
                panel.dataset.activationTime = Date.now(); // Записываем в свойства
                container.appendChild(panel);
            
                // Обработка нажатия соответствующей клавиши
                document.addEventListener('keydown', (e) => {
                    if (e.key === number.toString()) {
                        if(!canPressKeys){
                            return;
                        }
                        const currentTime = parseFloat(Date.now(), 10);
                        const activationTime = parseFloat(panel.dataset.activationTime, 10);
                        const elapsed = (currentTime - activationTime) / 1000;

                        var difficultyNum = 1/parseFloat(levelSettings.clickTolerance, 10);
                        var timeDifference = Math.abs(elapsed);
                        gameScore += Math.floor((difficultyNum / timeDifference)*3000);
                        document.getElementById("qte-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();


                        panel.remove();
                        clearTimeout(activationTimerId);
                        clearTimeout(finishTimerId);
                        activateTimer(); // Запуск нового таймера
                    }
                    else{
                        panel.style.backgroundColor = "red";
                        canPressKeys = false;
                    }
                }, { once: true }); // Обработчик события будет удалён после первого выполнения

                finishTimerId = setTimeout(() => {
                    panel.style.backgroundColor = "red";
                    panel.style.pointerEvents = "none";
                    canPressKeys = false;

                    clearTimeout(finishTimerId);
                    failLevel(2);
                }, levelSettings.clickTolerance * 1000);
                timerIds.push(finishTimerId);
                console.log(finishTimerId)

            }, timeoutSeconds * 1000);
            timerIds.push(activationTimerId);
            console.log(activationTimerId)
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

            const panels = document.querySelectorAll('.panel');
            panels.forEach(panel => {
                delete panel.dataset;
                document.getElementById('qte-game-objects-container').removeChild(panel);
            });

            setTimeout(() => {
                document.getElementById("qte-game-screen").style.display = "none";
                resolve(gameScore);

                gameScore = 0;
                document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
            }, 2000);
        }

        // Если игрок не успевает кликнуть на индикатор
        async function failLevel(a) {
            alert('Код проигрыша '+ a);
            await resetGame();
        }

        // Функция для сброса игры или подготовки к новой игре
        async function resetGame() {
            // Скрыть игровой экран и очистить все таймеры и данные
            
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


            if(!maxGameScore || maxGameScore < gameScore){
                lastUser.userdata.maxGameScore = gameScore;
                changeUser(lastUser);
            }

            setTimeout(() => {
                document.getElementById("qte-game-screen").style.display = "none";
                reject(gameScore);

                gameScore = 0;
                document.getElementById("indicator-score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
            }, 2000);
        }

    });
}

