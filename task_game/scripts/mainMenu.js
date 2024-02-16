document.getElementById("start-game").addEventListener("click", function() {
    const levelReached = localStorage.getItem('levelReached');
    if (levelReached && levelReached === '3') {
        // Показать экран с выбором продолжения игры
        showContinueScreen();
    } else {
        startCutscene(); // Начать с катсцены
    }
    document.getElementById("main-menu").style.display = "none"; // Скрыть главное меню
});

// Логика для старта катсцены
function startCutscene() {
    document.getElementById("cutscene-screen").style.display = "flex";
    showCutsceneText();
}

// Показать экран с выбором
function showContinueScreen() {
    document.getElementById("continue-screen").style.display = "flex";
}

// Обработчик клика для начала игры с катсцены
document.getElementById("start-from-beginning").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    startCutscene();
});

// Обработчик клика для начала игры с третьего уровня
document.getElementById("continue-froml-level-3").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    showTransitionScreen('3');
});

document.getElementById("instructions").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("instruction-screen").style.display = "block";
});

document.getElementById("scoreboard").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
});