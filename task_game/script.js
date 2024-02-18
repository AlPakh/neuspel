document.getElementById("back-to-menu-from-scoreboard").addEventListener("click", function() {
    document.getElementById("scoreboard-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});

// function checkLevelProgress() {
//     const levelReached = localStorage.getItem('levelReached');
//     if (levelReached && levelReached === '3') {
//         // Показать опции для игрока
//         document.getElementById("start-game").textContent = "Продолжить с уровня 3";
//         document.getElementById("start-from-beginning").style.display = "block";
//     } else {
//         // Стандартный текст кнопки и скрытие опции начала сначала
//         document.getElementById("start-game").textContent = "Начать игру";
//         document.getElementById("start-from-beginning").style.display = "none";
//     }
// }

// Функция для показа страницы перехода и автоматического перехода на уровень
function showTransitionScreen(level) {
    // Обновить localStorage, если текущий уровень больше сохранённого
    const levelReached = localStorage.getItem('levelReached');
    if (!levelReached || parseInt(level, 10) > parseInt(levelReached, 10)) {
        localStorage.setItem('levelReached', level.toString());
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
    const levelReached = localStorage.getItem('levelReached');
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
let gameTimer; //Таймер, раз в секунду обновляющий счётчик
let indicatorTimer; //Цифра, выводимая на индикаторе
let timeLeft; //Счётчик на таймере
let timerIds = []; //Идентификаторы всех таймеров
    
    let activationTimerId; // Идентификатор для таймера активации индикатора
    let clickWindowTimerId; // Идентификатор для таймера "окна для клика"
    let activeIndicators = document.querySelectorAll('.indicator');

// Функция для начала уровня
function startLevel(level) {
    currentLevel = level;
    timeLeft = levelSettings[level].duration;
    document.getElementById("countdown-timer").textContent = formatTime(timeLeft);
    switch(levelSettings[level].timeMod){
        case "-1":
            gameTimer = setInterval(updateCountupTimer, 1000); // Таймер уровня
        default:
            gameTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
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
        clearInterval(gameTimer);
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
        }, timeoutSeconds * 1000);
        timerIds.push(clickWindowTimerId);
        timerIds.push(activationTimerId);
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

    if (elapsed >= timeOnIndicator-levelSettings[currentLevel].clickTolerance && elapsed <= timeOnIndicator+levelSettings[currentLevel].clickTolerance) {
        // Успешный клик
        event.target.classList.remove('clickable', 'active');
        event.target.textContent = '';
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
    document.getElementById("game-screen").style.display = "none";
    currentLevel++;
    if (currentLevel <= Object.keys(levelSettings).length) {
        showTransitionScreen(currentLevel); // Показываем экран перехода на следующий уровень
    } else {
        showVictoryScreen(); // Показываем экран победы, если это был последний уровень
    }
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
    
    clearInterval(gameTimer);
    
    timerIds.forEach(timerId => clearTimeout(timerId));
    timerIds = [];

    const indicatorsContainer = document.querySelectorAll('.indicator');
    indicatorsContainer.forEach(indicator => {
        if(indicator.classList.length > 0)
        {
            indicator.classList.remove('active', 'clickable');
        }
        indicator.dataset.remove;
    });

    setTimeout(() => {
        document.getElementById("game-screen").style.display = "none";
        document.getElementById("main-menu").style.display = "flex"; 
    }, 2000);


}