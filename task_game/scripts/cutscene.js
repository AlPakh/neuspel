let currentTextIndex = 0;
let currentCharIndex = 0;
let timerChars;
var indPartInerv;

const cutsceneTexts = [
    "Вы сидите в кабине космического корабля",
    "На вас летит поток астероидов",
    "Ваша задача выполнять задания на время",
];

function showCutsceneText(partInrv) {
    if(!partInrv){
        indPartInerv = partInrv;
    }

    document.getElementById("click-continue-text").textContent = ". . .";

    if (currentTextIndex < cutsceneTexts.length) {
        let text = cutsceneTexts[currentTextIndex];
        if (currentCharIndex < text.length) {
            document.getElementById("cutscene-text").textContent += text[currentCharIndex++];
            timerChars = setTimeout(showCutsceneText(), 60); // Скорость вывода текста здесь
        }
        else
        {
            document.getElementById("click-continue-text").textContent = "Нажмите, чтобы продолжить";
        }
    }
}

function nextCutsceneText(partInrv) {
    playSwitch();
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

        clearInterval(indPartInerv); // Останавливаем создание частиц
        document.querySelectorAll(".particle").forEach(partcl => {
            partcl.remove();
            delete partcl;
        });

        // Отобразить экран перехода к первому уровню
        startGame();
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