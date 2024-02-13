window.onresize = function (event) {
    var bWid = window.innerWidth < 624;
    var bHei = window.innerHeight < 400;
    if (bWid || bHei) {
        // Показываем предупреждение
        document.querySelector('.warning').style.display = 'flex';
        var izmenit = "";
        if (bWid && bHei) {
            var izmenit = "ШИРИНУ и ВЫСОТУ";
        }
        else if (bHei && !bWid) {
            var izmenit = "ВЫСОТУ";
        }
        else if (bWid && !bHei) {
            var izmenit = "ШИРИНУ";
        }
        document.querySelector('.warning').textContent = "Ваше окно браузера слишком маленькое. Пожалуйста, увеличьте его " + izmenit + " для просмотра.";
    }
    else {
        // Скрываем предупреждение
        document.querySelector('.warning').style.display = 'none';
    }
};

let currentPage = 1;
const totalPages = 3;

function updatePageIndicator(currentPage, totalPages) {
    let indicator = '';
    for (let i = 1; i <= totalPages; i++) {
        indicator += i === currentPage ? '●' : '○';
    }
    return indicator;
}

function updateInstructionScreen() {
    document.getElementById("instruction-text").innerText = `Инструкция: Страница ${currentPage}`;
    document.getElementById("instruction-image").src = `image${currentPage}.jpg`; // Предполагается, что есть image1.jpg, image2.jpg, image3.jpg
    document.getElementById("instruction-page-indicator").innerText = updatePageIndicator(currentPage, totalPages);
    if (currentPage > 1 && currentPage < totalPages) {
        document.getElementById("prev-instruction").style.opacity = 1;
        document.getElementById("next-instruction").style.opacity = 1;
    }
    if (currentPage == 1){
        document.getElementById("prev-instruction").style.opacity = 0;
    }
    if (currentPage == totalPages){
        document.getElementById("next-instruction").style.opacity = 0;
    }

}

document.getElementById("prev-instruction").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        updateInstructionScreen();
    }
});

document.getElementById("next-instruction").addEventListener("click", function() {
    if (currentPage < totalPages) {
        currentPage++;
        updateInstructionScreen();
    }
});

updateInstructionScreen();

document.getElementById("start-game").addEventListener("click", function() {
    // Скрыть главное меню
    document.getElementById("main-menu").style.display = "none";
    // Показать экран игры (необходимо добавить логику)
    //document.getElementById("game-screen").style.display = "block";
});

document.getElementById("instructions").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("instruction-screen").style.display = "block";
});

document.getElementById("scoreboard").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
});

document.getElementById("back-to-menu-from-instructions").addEventListener("click", function() {
    document.getElementById("instruction-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});

document.getElementById("back-to-menu-from-scoreboard").addEventListener("click", function() {
    document.getElementById("scoreboard-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});