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


function setCangeNameButton(){
   if(parseInt(lastUser.userdata.levelReached, 10) == 0 && lastUser.userdata.firstLaunch == 'false'){
        document.getElementById('change-name').dataset.mode = 'off';
        document.getElementById('change-name').classList.add('unavailable-button');
    }
    else{
        document.getElementById('change-name').dataset.mode = 'off';
        document.getElementById('change-name').classList.remove('unavailable-button');
    } 
}

window.onload = (event) => {    setCangeNameButton();   } 

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

        lastUser = getCurrentUser();
        
        setCangeNameButton();
    }
}

document.getElementById("start-game").addEventListener("click", function() {
    var lastUser = getCurrentUser();
    playSwitch();
    const levelReached = lastUser.userdata.levelReached;
    document.getElementById("main-menu").style.display = "none"; // Скрыть главное меню
    if (levelReached && levelReached != '0') {        // Показать экран с выбором продолжения игры
        // Обработчик клика для начала игры с какого-лтбо уровня
        document.getElementById("ng-button").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            startCutscene();
        });

        document.getElementById("continue-button-2").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            startGame(2);
        });

        document.getElementById("continue-button-3").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            startGame(3);
        });

        document.getElementById("back-to-menu-from-continue-screen").addEventListener("click", function() {
            playSwitch();
            document.getElementById("continue-screen").style.display = "none";
            document.getElementById("main-menu").style.display = "flex";
        });

        document.querySelectorAll('.main-menu-button').forEach(button => {
            if (!button.hasAttribute('data-particles-added')) {
                button.addEventListener('mouseenter', createParticles);
                button.addEventListener('mouseleave', removeParticles);
                button.setAttribute('data-particles-added', 'true');
            }
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

    //kurwa kurwa kurwa

    
        let partInrv = particleInterval;
        
        const imageSpaceshipContainer = document.getElementById("cutscene-image-container");
        const imageSpaceship = document.getElementById("cutscene-image");
        clearInterval(partInrv);
        partInrv = setInterval(() => {
            const particleCount = 5;
            for (let i = 0; i < particleCount; i++) {
                const spaceShipParticle = document.createElement('div');
                spaceShipParticle.classList.add('particle');
                spaceShipParticle.style.animation = "fly 1s forwards ease-in-out, flyLeft 1s forwards";
                spaceShipParticle.style.left = `${imageSpaceship.offsetLeft + imageSpaceship.offsetWidth/15 + (Math.random() * (imageSpaceship.offsetWidth/10))}px`;
                spaceShipParticle.style.top = `${(imageSpaceship.offsetHeight*14/22) + (Math.random() * (imageSpaceship.offsetHeight/6))}px`;
                spaceShipParticle.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
                spaceShipParticle.style.setProperty('--y', `${(Math.random() - 0.5) * 40}px`);

                var colors = ["#3d9dd1", "#3e46c9", "#7092be", "#3d9dd1", "#343a93"] 
                spaceShipParticle.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    
                imageSpaceshipContainer.appendChild(spaceShipParticle);
    
                // Удаляем частицу после анимации
                spaceShipParticle.addEventListener('animationend', function () {
                    spaceShipParticle.remove();
                });
            }
            for (let i = 0; i < particleCount; i++) {
                const spaceShipParticle = document.createElement('div');
                spaceShipParticle.classList.add('particle');
                spaceShipParticle.style.width = "3px";
                spaceShipParticle.style.height = "3px";
                spaceShipParticle.style.zIndex = "1";
                
                spaceShipParticle.style.animation = "fly 1s forwards ease-in-out, flyLeft 1s forwards";
                spaceShipParticle.style.left = `${imageSpaceship.offsetLeft + imageSpaceship.offsetWidth/4 + (Math.random() * (imageSpaceship.offsetWidth/10))}px`;
                spaceShipParticle.style.top = `${(imageSpaceship.offsetHeight*10/22) + (Math.random() * (imageSpaceship.offsetHeight/8))}px`;
                spaceShipParticle.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
                spaceShipParticle.style.setProperty('--y', `${(Math.random() - 0.5) * 20}px`);

                var colors = ["#3d9dd1", "#3e46c9", "#7092be", "#3d9dd1", "#343a93"] 
                spaceShipParticle.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    
                imageSpaceshipContainer.appendChild(spaceShipParticle);
    
                // Удаляем частицу после анимации
                spaceShipParticle.addEventListener('animationend', function () {
                    spaceShipParticle.remove();
                });
            }
        }, 50); // частота создания частиц
    

    showCutsceneText(partInrv);
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

var particleInterval;

function createParticles(e) {
    const button = e.target;
    clearInterval(particleInterval);
    particleInterval = setInterval(() => {
        const particleCount = 5;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.animation = "fly 1s forwards ease-in-out, flyLeft 1s forwards";
            particle.style.left = `${button.offsetLeft + button.offsetWidth}px`;
            particle.style.top = `${button.offsetTop + (Math.random() * button.offsetHeight)}px`;
            particle.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
            particle.style.setProperty('--y', `${(Math.random() - 0.5) * 30}px`);

            // Удаляем частицу после анимации
            particle.addEventListener('animationend', function () {
                particle.remove();
                delete particle;
            });

            button.appendChild(particle);
        }
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.animation = "fly 1s forwards ease-in-out, flyRight 1s forwards";
            particle.style.left = `${button.offsetLeft}px`;
            particle.style.top = `${button.offsetTop + (Math.random() * button.offsetHeight)}px`;
            particle.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
            particle.style.setProperty('--y', `${(Math.random() - 0.5) * 30}px`);

            // Удаляем частицу после анимации
            particle.addEventListener('animationend', function () {
                particle.remove();
                delete particle;
            });

            button.appendChild(particle);
        }

    }, 100); // частота создания частиц
}

function removeParticles() {
    clearInterval(particleInterval); // Останавливаем создание частиц
    document.querySelectorAll(".particle").forEach(partcl => {
        partcl.remove();
        delete partcl;
    });
}

document.querySelectorAll('.main-menu-button').forEach(button => {
    if (!button.hasAttribute('data-particles-added')) {
        button.addEventListener('mouseenter', createParticles);
        button.addEventListener('mouseleave', removeParticles);
        button.setAttribute('data-particles-added', 'true');
    }
  });

