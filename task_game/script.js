document.getElementById("back-to-menu-from-scoreboard").addEventListener("click", function() {
    document.getElementById("scoreboard-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});








function checkLevelProgress() {
    const levelReached = localStorage.getItem('levelReached');
    if (levelReached && levelReached === '3') {
        // Показать опции для игрока
        document.getElementById("start-game").textContent = "Продолжить с уровня 3";
        document.getElementById("start-from-beginning").style.display = "block";
    } else {
        // Стандартный текст кнопки и скрытие опции начала сначала
        document.getElementById("start-game").textContent = "Начать игру";
        document.getElementById("start-from-beginning").style.display = "none";
    }
}


function startLevel3() {
    // Логика для старта третьего уровня
    document.getElementById("level3-screen").style.display = "flex";
    // Вызов функции начала третьего уровня
}

// Вызовите эту функцию, когда игрок достигает третьего уровня
// function playerReachedLevel3() {
//     localStorage.setItem('levelReached', '3');
// }

// При загрузке страницы проверяем, достигнут ли третий уровень
//window.onload = checkLevelProgress;

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
        // Здесь вызовите функцию для начала уровня, например:
        startLevel(level);
    }, 3000); // 3 секунды
}

// Функция для начала игры на определённом уровне
function startLevel(level) {
    console.log("Начинаем уровень " + level);
    // Здесь будет логика для запуска уровня
}

