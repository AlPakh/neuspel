let currentTextIndex = 0;
let currentCharIndex = 0;
let timerChars;

const cutsceneTexts = [
    "Вы сидите в кабине космического корабля",
    "Системы безопастности предупреждают вас о приближающихся астероидах",
    "Ваша задача нажимать на индикаторы через указанное на них время",
];

function showCutsceneText() {
    if (currentTextIndex < cutsceneTexts.length) {
        let text = cutsceneTexts[currentTextIndex];
        if (currentCharIndex < text.length) {
            document.getElementById("cutscene-text").textContent += text[currentCharIndex++];
            timerChars = setTimeout(showCutsceneText, 60); // Скорость вывода текста здесь
        }
        else
        {
            document.getElementById("click-continue-text").textContent = "Нажмите, чтобы продолжить";
        }
    }
}

function nextCutsceneText() {
    clearTimeout(timerChars); // Очищаем текущий таймер, если он есть
    if (currentCharIndex < cutsceneTexts[currentTextIndex].length) // Если текст ещё не закончил выводиться, выводим его полностью
    {
        document.getElementById("cutscene-text").textContent = cutsceneTexts[currentTextIndex];
        currentCharIndex = cutsceneTexts[currentTextIndex].length;
        document.getElementById("click-continue-text").textContent = "Нажмите, чтобы продолжить";
        //document.getElementById("click-continue-text").style.display = "block";
    } 
    else if (currentTextIndex < cutsceneTexts.length - 1) // Переходим к следующему блоку текста
    {
        currentTextIndex++;
        currentCharIndex = 0;
        document.getElementById("cutscene-text").textContent = '';
        showCutsceneText();
        document.getElementById("click-continue-text").textContent = ". . .";
        //document.getElementById("click-continue-text").style.display = "none";
    } 
    else // Переход к следующему экрану после последнего блока текста
    {
        document.getElementById("cutscene-screen").style.display = 'none';
        currentTextIndex = 0;
        currentCharIndex = 0;
        // Отобразить экран перехода к первому уровню
        showTransitionScreen('1');
        document.getElementById("click-continue-text").textContent = ". . .";
        document.getElementById("cutscene-text").textContent = "";
    }
}

function skipCutscene() {
    clearTimeout(timerChars); 
    currentTextIndex = cutsceneTexts.length - 1;
    currentCharIndex = cutsceneTexts[currentTextIndex].length;
    nextCutsceneText();
}

document.getElementById("cut-text-container").addEventListener('click', nextCutsceneText);

document.getElementById("cutscene-skip-button").addEventListener('click', skipCutscene)