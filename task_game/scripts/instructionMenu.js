let curInstPage = 1;
var instructionNotes = [ "",
    "Здравствуйте! \nПеред вами «Буревестник» — браузерная игра, созданная, чтобы проверить Ваши навыки ориентирования во времени.",
    "Уровни \nВ этой игре Вам будет представлены две мини-игры. У каждой из них есть три уровня сложности. Когда вы пройдёте обе миниигры на каждом уровне сложности. \nВы сможете выбирать уровень с которого хотите продолжить начиная со второго запуска",
    "Никнейм \n«Буревестник» — название не просто игры, а Вашего космического корабля. Однако, вы можете менять его, если вы уже посетили уровни. Для выбора нового имени, кликните на название игры в главном меню. Не забудьте сохранить введённое имя!",
    "Слушайте\n Звуками в мини-играх обозначаются ваши успехи, промахи, а также появление объектов на экране. Если на слух у вас реакция быстрее, не забудьте включить звук!",
    "Первая мини-игра — «Индикаторы». \nНа экране синим цветом загорается один из трёх индикаторов; в это время на нём появляется число. Вам необходимо нажать на индикатор через столько секунд, сколько изображено на индикаторе. Если вы успели кликнуть, индикатор загорится зелёным. если нет — красным",
    "Вторая мини-игра — «QTE». \nНа экране случайно появляются зелёные панельки с цифрами. Вам необходимо нажать на соответствующую клавишу на клавиатуре настолько быстро, насколько возможно. Не перепутайте нужную панельку с обманкой!"
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
    document.getElementById("instruction-text").innerText = instructionNotes[curInstPage];
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