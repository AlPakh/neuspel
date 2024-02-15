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

document.getElementById("start-game").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("cutscene-screen").style.display = "flex";
    showCutsceneText(); // Запускаем катсцену
});



const cutsceneTexts = [
    "В начале было слово.",
    "И слово было:...",
    "... \"опоздал\".",
];
let currentTextIndex = 0;
let currentCharIndex = 0;
let timer;

function showCutsceneText() {
    if (currentTextIndex < cutsceneTexts.length) {
        let text = cutsceneTexts[currentTextIndex];
        if (currentCharIndex < text.length) {
            document.getElementById('cutscene-text').textContent += text[currentCharIndex++];
            timer = setTimeout(showCutsceneText, 50); // Регулируйте скорость вывода текста здесь
        }
    }
}

function nextCutsceneText() {
    clearTimeout(timer); // Очищаем текущий таймер, если он есть
    if (currentCharIndex < cutsceneTexts[currentTextIndex].length) {
        // Если текст ещё не закончил выводиться, выводим его полностью
        document.getElementById('cutscene-text').textContent = cutsceneTexts[currentTextIndex];
        currentCharIndex = cutsceneTexts[currentTextIndex].length;
    } else if (currentTextIndex < cutsceneTexts.length - 1) {
        // Переходим к следующему блоку текста
        currentTextIndex++;
        currentCharIndex = 0;
        document.getElementById('cutscene-text').textContent = '';
        showCutsceneText();
    } else {
        // Здесь логика перехода к следующему экрану после последнего блока текста
        document.getElementById('cutscene-screen').style.display = 'none';
        // Например, отобразить экран перехода к первому уровню
        // document.getElementById('level-transition-screen').style.display = 'block';
    }
}

document.getElementById('cutscene-text').addEventListener('click', nextCutsceneText);


document.getElementById("start-game").addEventListener("click", function() {
    const levelReached = localStorage.getItem('levelReached');
    document.getElementById("main-menu").style.display = "none";
    if (levelReached && levelReached === '3') {
        // Загрузить третий уровень
        startLevel3();
    } else {
        // Начать с катсцены
        startCutscene();
    }
});

// Обработчик клика для начала игры сначала
document.getElementById("start-from-beginning").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    startCutscene();
});

function startCutscene() {
    // Логика для старта катсцены
    document.getElementById("cutscene-screen").style.display = "flex";
    showCutsceneText();
}

function startLevel3() {
    // Логика для старта третьего уровня
    document.getElementById("level3-screen").style.display = "flex";
    // Вызов функции начала третьего уровня
}

// Вызовите эту функцию, когда игрок достигает третьего уровня
function playerReachedLevel3() {
    localStorage.setItem('levelReached', '3');
}

// При загрузке страницы проверяем, достигнут ли третий уровень
window.onload = checkLevelProgress;
