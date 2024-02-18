document.getElementById("start-game").addEventListener("click", function() {
    const levelReached = localStorage.getItem('levelReached');
    document.getElementById("main-menu").style.display = "none"; // Скрыть главное меню
    if (levelReached && levelReached === '3') {        // Показать экран с выбором продолжения игры
        // Обработчик клика для начала игры с катсцены
        document.getElementById("ng-button").addEventListener("click", function() {
            document.getElementById("continue-screen").style.display = "none";
            startCutscene();
        });

        // Обработчик клика для начала игры с третьего уровня
        document.getElementById("continue-button").addEventListener("click", function() {
            document.getElementById("continue-screen").style.display = "none";
            showTransitionScreen('3');
        });
        document.getElementById("continue-screen").style.display = "flex";
    } 
    else {
        startCutscene(); // Начать с катсцены
    }
});

// Логика для старта катсцены
function startCutscene() {
    document.getElementById("cutscene-screen").style.display = "flex";
    const firstLaunch = localStorage.getItem('firstLaunch');
    if (firstLaunch != "true") {
        localStorage.setItem('firstLaunch', "true");
        document.getElementById("cutscene-skip-button").style.display = "none";
    }
    else{
        document.getElementById("cutscene-skip-button").style.display = "block";
    }
    showCutsceneText();
}

document.getElementById("instructions").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    updateInstructionScreen();
    document.getElementById("instruction-screen").style.display = "block";
});

document.getElementById("scoreboard").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
});

