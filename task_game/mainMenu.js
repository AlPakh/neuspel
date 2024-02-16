document.getElementById("start-game").addEventListener("click", function() {
    const levelReached = localStorage.getItem('levelReached');
    if (levelReached && levelReached === '3') {
        // Показать экран с выбором продолжения игры
        showContinueScreen();
    } else {
        // Начать с катсцены
        startCutscene();
    }
    // Скрыть главное меню
    document.getElementById("main-menu").style.display = "none";
});

document.getElementById("instructions").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("instruction-screen").style.display = "block";
});

document.getElementById("scoreboard").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
});