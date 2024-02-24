let curInstPage = 1;
const totInstPages = 3;

function updatePageIndicator(currentPage, totalPages) {
    let indicator = '';
    for (let i = 1; i <= totalPages; i++) {
        indicator += i === currentPage ? '●' : '○';
    }
    return indicator;
}

function updateInstructionScreen() {
    document.getElementById("instruction-text").innerText = `Инструкция: Страница ${curInstPage}`;
    document.getElementById("instruction-image").src = `image${curInstPage}.jpg`; // Предполагается, что есть image1.jpg, image2.jpg, image3.jpg
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