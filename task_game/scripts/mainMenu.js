var lastUser = getCurrentUser();
var storedUsers = getUsers();
document.getElementById('title').innerHTML = lastUser.username;
if(lastUser.userdata.firstLaunch == 'false' && storedUsers.length == 1){
    document.getElementById('change-name').classList.add('unavailable-button');
}
else{
    var changeNameButton = document.getElementById('change-name');
    changeNameButton.classList.remove('unavailable-button');
    changeNameButton.addEventListener("click", changeNameButtonPressed);
}

//Сохранение имени нового пользователя
function changeNameButtonPressed(){
    var changeNameButton = document.getElementById('change-name');
    playSwitch();
    if(changeNameButton.dataset.mode == 'off'){
        document.getElementById('title').contentEditable = true;
        
        document.getElementById('start-game').classList.add('unavailable-button');
        document.getElementById('instructions').classList.add('unavailable-button');
        document.getElementById('scoreboard').classList.add('unavailable-button');

        document.getElementById('title').focus();
        document.getElementById('title').style.userSelect = 'auto';
        document.getElementById('title').textContent.select
        changeNameButton.textContent = 'Сохранить имя';



        changeNameButton.dataset.mode = 'active';
    }
    else if(changeNameButton.dataset.mode == 'active' && document.getElementById('title').textContent != ""){
        document.getElementById('title').contentEditable = false;
        document.getElementById('start-game').classList.remove('unavailable-button');
        document.getElementById('instructions').classList.remove('unavailable-button');
        document.getElementById('scoreboard').classList.remove('unavailable-button');

        var newName = document.getElementById('title').textContent;
        document.getElementById('title').style.userSelect = 'none';
        var parseName = newName.toUpperCase()

        newUser(parseName);
        changeNameButton.textContent = 'Изменить имя';
        changeNameButton.dataset.mode = 'off';
    }
}

document.getElementById("start-game").addEventListener("click", function() {
    var lastUser = getCurrentUser();
    playSwitch();
    const levelReached = lastUser.userdata.levelReached;
    document.getElementById("main-menu").style.display = "none"; // Скрыть главное меню
    if (levelReached && levelReached == '3') {        // Показать экран с выбором продолжения игры
        // Обработчик клика для начала игры с катсцены
        document.getElementById("ng-button").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            startCutscene();
        });

        // Обработчик клика для начала игры с третьего уровня
        document.getElementById("continue-button").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            startGame(3);
        });
        document.getElementById("continue-screen").style.display = "flex";
    } 
    else {
        startCutscene(); // Начать с катсцены
    }
});

// Логика для старта катсцены
function startCutscene() {
    document.getElementById("cutscene-screen").style.display = "flex";
    var lastUser = getCurrentUser();
    const firstLaunch = lastUser.userdata.firstLaunch;
    if (firstLaunch != "true") {
        lastUser.userdata.firstLaunch = "true";
        changeUser(lastUser);
        document.getElementById("cutscene-skip-button").style.display = "none";
    }
    else{
        document.getElementById("cutscene-skip-button").style.display = "block";
    }
    showCutsceneText();
}

document.getElementById("instructions").addEventListener("click", function() {
    playSwitch();
    document.getElementById("main-menu").style.display = "none";
    updateInstructionScreen();
    document.getElementById("instruction-screen").style.display = "block";
});

document.getElementById("scoreboard").addEventListener("click", function() {
    playSwitch();
    document.getElementById("main-menu").style.display = "none";
    showScoreboard();
    document.getElementById("scoreboard-screen").style.display = "flex";
});

//Фильтрация недопустимых символов
document.getElementById('title').addEventListener('input', function(e) {
    // Регулярное выражение для проверки символов кириллицы и латинского алфавита
    const regex = /^[А-яёЁA-Za-z[-`!#-&(-@ \s]+$/;
    
    // Проверяем каждый символ введенного значения
    let filtered = Array.from(this.textContent).filter(char => regex.test(char)).join('');
    
    // Запоминаем текущую позицию курсора
    const cursorPosition = this.textContent.selectionStart;

    // Флаг, указывающий на то, было ли изменено значение поля ввода
    const isValueChanged = this.textContent !== filtered;

    // Обновляем значение поля ввода
    this.textContent = filtered;

    if (this.textContent.length > 16) {
        // Обрезаем текст до максимально допустимой длины
        this.textContent = this.textContent.substr(0, 16);
    }

    if (isValueChanged) {
        // Восстанавливаем позицию курсора в конце текста
        this.textContent.selectionStart = cursorPosition;
    }
});

//По нажатию на enter сохранять введённое имя
document.getElementById('title').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        changeNameButtonPressed();
    }
});
