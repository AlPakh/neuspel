let curInstPage = 1;
var instructionNotes = [ "",
    "<strong>Здравствуйте!</strong> <br>Перед вами «Буревестник» — браузерная игра, созданная, чтобы проверить Ваши навыки ориентирования во времени.",
    "<strong>Уровни</strong> <br>В этой игре Вам будет представлены три мини-игры. У каждой из них есть три уровня сложности. Когда вы пройдёте все миниигры на каждом уровне сложности, игра завершится. На разных уровнях сложности цель мини-игры не меняется, но меняется время уровня, награда и наказание за ошибку, а также появляются отвлекающие элементы, такие как элементы-обманки, перемешивание элементови т.д. <br>Вы сможете выбирать уровень с которого хотите продолжить начиная со второго запуска игры.",
    "<strong>Никнейм</strong> <br>«Буревестник» — название не просто игры, а Вашего космического корабля. Однако, вы можете менять его, если вы уже посетили уровни. Для выбора нового имени, кликните на название игры в главном меню. Не забудьте сохранить введённое имя!",
    "<strong>Слушайте</strong><br> Звуками в мини-играх обозначаются ваши успехи, промахи, а также появление объектов на экране. Если на слух у вас реакция быстрее, не забудьте включить звук!",
    "<strong>Первая мини-игра — «Индикаторы»</strong> <br>На экране синим цветом загорается один из трёх индикаторов; в это время на нём появляется число. Вам необходимо нажать на индикатор через столько секунд, сколько изображено на индикаторе. Если вы успели кликнуть, индикатор загорится зелёным. если нет — красным.",
    "<strong>Вторая мини-игра — «QTE»</strong> <br>На экране случайно появляются зелёные панельки с цифрами. Вам необходимо нажать на соответствующую клавишу на клавиатуре настолько быстро, насколько возможно. Не перепутайте нужную панельку с обманкой!",
    "<strong>Третья мини-игра — «Часы»</strong> <br>На экране Находится циферблат с двумя стрелками и несколько маленьких часов. Вам необходимо нажимать и перетаскивать стрелки на больших часах так, чтобы они соответствовали положениям стрелок на маленьких часах. Уровень завершится, когда Вы наберёте каждую из представленных комбинаций."
];
const totInstPages = instructionNotes.length - 1;

function updatePageIndicator(currentPage, totalPages) {
    let indicator = '';
    for (let i = 1; i <= totalPages; i++) {
        indicator += i === currentPage ? '●' : '○';
    }
    return indicator;
}

function updateInstructionScreen() {
    document.getElementById("instruction-text").innerHTML = instructionNotes[curInstPage];
    document.getElementById("instruction-image").src = `img/image${curInstPage}.png`; // Предполагается, что есть image1.jpg, image2.jpg, image3.jpg
    document.getElementById("instruction-page-indicator").innerText = updatePageIndicator(curInstPage, totInstPages);
    if (curInstPage > 1 && curInstPage < totInstPages) {
        document.getElementById("prev-instruction").style.opacity = 1;
        document.getElementById("next-instruction").style.opacity = 1;
    }
    if (curInstPage == 1){
        document.getElementById("prev-instruction").style.opacity = 0;
    }
    if (curInstPage == totInstPages){
        document.getElementById("next-instruction").style.opacity = 0;
    }

}

document.getElementById("prev-instruction").addEventListener("click", function() {
    playSwitch();
    if (curInstPage > 1) {
        curInstPage--;
        updateInstructionScreen();
    }
});

document.getElementById("next-instruction").addEventListener("click", function() {
    playSwitch();
    if (curInstPage < totInstPages) {
        curInstPage++;
        updateInstructionScreen();
    }
});

document.getElementById("back-to-menu-from-instructions").addEventListener("click", function() {
    playSwitch();
    document.getElementById("instruction-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
});