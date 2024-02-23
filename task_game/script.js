// Функция для показа страницы перехода и автоматического перехода на уровень
function showTransitionScreen(level) {
    // Обновить localStorage, если текущий уровень больше сохранённого
    const levelReached = lastUser.userdata.levelReached;
    if (!levelReached || parseInt(level, 10) > parseInt(levelReached, 10)) {
        lastUser.userdata.levelReached = level.toString();
        changeUser(lastUser);
    }

    // Показать страницу перехода
    document.getElementById("transition-message").textContent = "Уровень " + level;
    document.getElementById("transition-screen").style.display = "flex";

    // Установить таймер для автоматического перехода на уровень
    setTimeout(function() {
        document.getElementById("transition-screen").style.display = "none";
        startLevel(level);        // Начало уровня
    }, 3000);
}

// Инициализация игры (можно вызвать при полной загрузке страницы)
function initGame() {
    const levelReached = lastUser.userdata.levelReached;
    const maxGameScore = lastUser.userdata.maxGameScore;
    // ... Остальной код инициализации игры
    initIndicators(); // Инициализация индикаторов
}

// Вызов функции инициализации
window.onload = initGame;

// Настройки игры для каждого уровня
const levelSettings = {
    1: { duration: 30, indicatorTimeout: { min: 3, max: 5 }, clickTolerance: 1, timeMod: "1" },
    2: { duration: 20, indicatorTimeout: { min: 3, max: 5 }, clickTolerance: 0.5, timeMod: "1" },
    3: { duration: 15, indicatorTimeout: { min: 2, max: 5 }, clickTolerance: 1, timeMod: "-1"  }
};

let currentLevel;
let gameUPTimer; //Таймер, раз в секунду обновляющий счётчик
let gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
let timeLeft; //Счётчик на таймере
let timerIds = []; //Идентификаторы всех таймеров
let gameScore = 0;
    
let activationTimerId; // Идентификатор для таймера активации индикатора
let clickWindowTimerId; // Идентификатор для таймера "окна для клика"
let activeIndicators = document.querySelectorAll('.indicator');
var lastUser = getCurrentUser();
const maxGameScore = lastUser.userdata.maxGameScore;

// Функция для начала уровня
function startLevel(level) {
    currentLevel = level;
    timeLeft = levelSettings[level].duration;
    document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
    switch(levelSettings[level].timeMod){
        case "-1":
            gameUPTimer = setInterval(updateCountupTimer, 1000); // Таймер уровня
        default:
            gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
    }
    activateIndicator(); // Активируем первый индикатор
    console.log("Начинаем уровень " + level);
    // Показать игровой экран
    document.getElementById("game-screen").style.display = "flex";

    // Инициализация индикаторов при старте уровня
    initIndicators();
}

// Функция обновления таймера обратного отсчёта
function updateCountdownTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
    } 
    else 
    {
        clearInterval(gameDOWNTimer);
        endLevel(); // Завершить уровень
    }
}

// Функция обновления таймера для третьего уровня
function updateCountupTimer() {
    timeLeft = Math.floor(Math.random() * 3600) + 2;
    document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
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
    if(!selectedIndicator.classList.contains('clickable'))
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
            }, (timeoutSeconds + levelSettings[currentLevel].clickTolerance) * 1000);
            timerIds.push(clickWindowTimerId);
            console.log(clickWindowTimerId);
        }, timeoutSeconds * 1000);
        timerIds.push(activationTimerId);
        console.log(activationTimerId)
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

    //alert(currentTime + ' '+ activationTime + " " +  elapsed + " " + elapsed >= -levelSettings[currentLevel].clickTolerance + ' ' + elapsed <= levelSettings[currentLevel].clickTolerance)

    var timeMin = parseInt(timeOnIndicator, 10)-parseFloat(levelSettings[currentLevel].clickTolerance);
    var timeMax = parseInt(timeOnIndicator, 10)+parseFloat(levelSettings[currentLevel].clickTolerance);

    if (elapsed >= timeMin && elapsed <= timeMax) {
        // Успешный клик
        event.target.classList.remove('clickable', 'active');
        event.target.textContent = '';
        var difficultyNum = 1/parseFloat(levelSettings[currentLevel].clickTolerance, 10);
        var timeDifference = Math.abs(elapsed-timeOnIndicator);
        gameScore += Math.floor((difficultyNum / timeDifference)*100);
        document.getElementById("score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();
        activateIndicator(); // Активируем следующий индикатор
    } else {
        // Нажатие вне временного окна
        failLevel('1');
    }
}

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

// Генерация случайного таймаута для индикатора в секундах
function getRandomTimeoutSeconds(level) {
    let timeout = levelSettings[level].indicatorTimeout;
    return Math.floor(Math.random() * (timeout.max - timeout.min + 1) + timeout.min);
}

// Завершение уровня
function endLevel() {
    alert('Уровень ' + currentLevel + ' пройден!');
    timeLeft = 0;

    clearInterval(gameDOWNTimer);
    clearTimeout(gameDOWNTimer);

    clearInterval(gameUPTimer);
    clearTimeout(gameUPTimer);
    
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
        document.getElementById("game-screen").style.display = "none";
        currentLevel++;
        if (currentLevel <= Object.keys(levelSettings).length) {
            showTransitionScreen(currentLevel); // Показываем экран перехода на следующий уровень
        } else {
            showVictoryScreen(); // Показываем экран победы, если это был последний уровень
        }
    }, 2000);

}

// Если игрок не успевает кликнуть на индикатор
function failLevel(a) {
    alert('Код проигрыша '+ a);
    resetGame();
}

// Показать экран победы или окончания игры
function showVictoryScreen() {
    // Здесь можно показать какое-то сообщение или окно с поздравлением
    console.log("Поздравляем! Вы прошли все уровни!");
    resetGame();
}

// Функция для сброса игры или подготовки к новой игре
function resetGame() {
    // Скрыть игровой экран и очистить все таймеры и данные
    
    timeLeft = 0;

    clearInterval(gameDOWNTimer);
    clearTimeout(gameDOWNTimer);

    clearInterval(gameUPTimer);
    clearTimeout(gameUPTimer);
    
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

    gameScore = 0;
    document.getElementById("score-text").textContent = "0".repeat(12-gameScore.toString().length) + gameScore.toString();

    setTimeout(() => {
        document.getElementById("game-screen").style.display = "none";
        document.getElementById("main-menu").style.display = "flex"; 
    }, 2000);
}