document.getElementById("back-to-menu-from-scoreboard").addEventListener("click", function() {
    document.getElementById("scoreboard-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});




function showContinueScreen() {
    // Показать экран с выбором
    document.getElementById("continue-screen").style.display = "flex";
}

function startCutscene() {
    // Логика для старта катсцены
    document.getElementById("cutscene-screen").style.display = "flex";
    showCutsceneText();
}

const cutsceneTexts = [
    "В начале было слово.",
    "И слово было:...",
    "... \"опоздал\".",
];

//Для бегущей строки
let currentTextIndex = 0;
let currentCharIndex = 0;
let timer;

function showCutsceneText() {
    if (currentTextIndex < cutsceneTexts.length) {
        let text = cutsceneTexts[currentTextIndex];
        if (currentCharIndex < text.length) {
            document.getElementById('cutscene-text').textContent += text[currentCharIndex++];
            timer = setTimeout(showCutsceneText, 100); // Скорость вывода текста здесь
        }
    }
}

function nextCutsceneText() {
    clearTimeout(timer); // Очищаем текущий таймер, если он есть
    if (currentCharIndex < cutsceneTexts[currentTextIndex].length) // Если текст ещё не закончил выводиться, выводим его полностью
    {

        document.getElementById('cutscene-text').textContent = cutsceneTexts[currentTextIndex];
        currentCharIndex = cutsceneTexts[currentTextIndex].length;
    } 
    else if (currentTextIndex < cutsceneTexts.length - 1) // Переходим к следующему блоку текста
    {
        currentTextIndex++;
        currentCharIndex = 0;
        document.getElementById('cutscene-text').textContent = '';
        showCutsceneText();
    } 
    else // Переход к следующему экрану после последнего блока текста
    {
        document.getElementById('cutscene-screen').style.display = 'none';
        currentTextIndex = 0;
        // Например, отобразить экран перехода к первому уровню
        // document.getElementById('level-transition-screen').style.display = 'block';
    }
}

document.getElementById('cutscene-text').addEventListener('click', nextCutsceneText);

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


// Обработчик клика для начала игры сначала
document.getElementById("start-from-beginning").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    startCutscene();
});

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
