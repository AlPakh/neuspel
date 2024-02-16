let currentTextIndex = 0;
let currentCharIndex = 0;
let timer;

const cutsceneTexts = [
    "В начале было слово.",
    "И слово было:...",
    "... \"опоздал\".",
];

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
        // Отобразить экран перехода к первому уровню
        // document.getElementById('level-transition-screen').style.display = 'block';
        showTransitionScreen('1');
    }
}

document.getElementById('cutscene-text').addEventListener('click', nextCutsceneText);