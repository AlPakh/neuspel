async function startGame(lvl){
    var games = [
        {
            name: 'indicators',
            ruName: 'Индикаторы', 
            message: 'На этом уровне надо следить за тремя индикаторами. Когда индикатор зажигается, на нём отображается время в секундах, через которое надо на него нажать', 
            settings: {
                1: { duration: 25, timeExists: { min: 3, max: 5 }, timeWaits: { min: 2, max: 4 }, clickTolerance: 1, punishment: 5},
                2: { duration: 20, timeExists: { min: 2, max: 4 }, timeWaits: { min: 2, max: 3 }, clickTolerance: 0.5, punishment: 4},
                3: { duration: 15, timeExists: { min: 2, max: 3 }, timeWaits: { min: 2, max: 2 }, clickTolerance: 1, punishment: 3}
            }
        },
        {
            name: 'qte', 
            ruName: 'QTE', 
            message: 'На этом уровне на экране появляются случайные клавиши с клавиатуры. Когда клавиша появляется на экране, нужно как можно быстрее нажать на соответствующую кнопку на клавиатуре', 
            settings: {
                1: { duration: 20, timeExists: { min: 3, max: 3 }, timeWaits: { min: 2, max: 2 }, clickTolerance: 2.5, punishment: 5},
                2: { duration: 20, timeExists: { min: 2, max: 3 }, timeWaits: { min: 2, max: 2 }, clickTolerance: 2, punishment: 4 },
                3: { duration: 15, timeExists: { min: 1, max: 2 }, timeWaits: { min: 2, max: 2 }, clickTolerance: 1.5, punishment: 3 }
            }
        },
        {
            name: 'clock', 
            ruName: 'Часы', 
            message: 'На этом уровне у вас будут большие часы с двумя стрелками и несколько маленьких. Вам необходимо поочерёдно ввести на больших часах время, указанное намаленьких', 
            settings: {
                1: { duration: 25, clockAmount: 3, angleDifference: 10, punishment: 5},
                2: { duration: 20, clockAmount: 4, angleDifference: 7, punishment: 4 },
                3: { duration: 25, clockAmount: 5, angleDifference: 7, punishment: 3 }
            }
        }
    ];

    var levelOfChallenge;

    if(!lvl){
        levelOfChallenge = 1;
    }
    else{
        levelOfChallenge = lvl;
    }
    
    var gameFailed = false;
    var globalStoredScore = 0;

    while(levelOfChallenge < 4 && !gameFailed){
        //Тут будут меняться уровни сложности
        var levelFinished = false;
        var gameToLaunchIndex = 0;

        // Обновить localStorage, если текущий уровень больше сохранённого
        const levelReached = lastUser.userdata.levelReached;
        if (!levelReached || levelOfChallenge > parseInt(levelReached, 10)) {
            lastUser.userdata.levelReached = levelOfChallenge;
            changeUser(lastUser);
        }


        //Получаем случайный порядок миниигр
        var gameIndexes = [0, 1, 2];        //==================================================ДОБАВЛЯТЬ ПО МЕРЕ ГОТОВНОСТИ
        var gamesOrder = [];
        var n = gameIndexes.length

        for (let i = 0; i < n; i++) {
            var randomIndex = Math.floor(Math.random() * gameIndexes.length);
            gamesOrder.push(gameIndexes[randomIndex]);
            gameIndexes.splice(randomIndex, 1);
        }



        

        while(!levelFinished && !gameFailed && gameToLaunchIndex < gamesOrder.length){
            //Тут будут меняться миниигры
            var minigameFinished = false;
            var randomGame = gamesOrder[gameToLaunchIndex];
            while(!minigameFinished && !gameFailed){
                //Здесь будет запускаться и проигрываться одна миниигра
                var currRGame = games[randomGame];
                await showTransitionScreen(levelOfChallenge, currRGame.message, currRGame.ruName);
                var launchedMinigameScore = 0;

                switch(randomGame){
                    case 0:
                        var currGame = games[0];
                        var currentMinigameSettings = currGame.settings[levelOfChallenge];
                        try{
                            const result = await startIndicatorLevel(levelOfChallenge, currentMinigameSettings, globalStoredScore);
                            console.log("result = " + result);
                            launchedMinigameScore = result;
                            console.log("cgameScore = " + launchedMinigameScore);
                            break;
                        }
                        catch (error){
                            gameFailed = true;
                            launchedMinigameScore = error;
                            break;
                        }
                    case 1:
                        var currGame = games[1];
                        var currentMinigameSettings = currGame.settings[levelOfChallenge];
                        try{
                            const result = await startQTELevel(levelOfChallenge, currentMinigameSettings, globalStoredScore);
                            launchedMinigameScore = result;
                            break;
                        }
                        catch (error){
                            gameFailed = true;
                            launchedMinigameScore = error;
                            break;
                        }
                    case 2:
                        var currGame = games[2];
                        var currentMinigameSettings = currGame.settings[levelOfChallenge];
                        try {
                            const result = await startClockLevel(levelOfChallenge, currentMinigameSettings, globalStoredScore);
                            console.log("result = " + result);
                            launchedMinigameScore = result;
                            break;
                        }
                        catch (error) {
                            gameFailed = true;
                            launchedMinigameScore = error;
                            break;
                        }
                }
                
                console.log('after level: ' + launchedMinigameScore);
                globalStoredScore = launchedMinigameScore;
                console.log('now global: ' + globalStoredScore);
                minigameFinished = true;
            }
            gameToLaunchIndex++;
        }
        levelOfChallenge++;
    }

    var afterGameUser = getCurrentUser();
    var maxGameScore = afterGameUser.userdata.maxGameScore;
    
    if(!maxGameScore || maxGameScore < globalStoredScore){
        lastUser.userdata.maxGameScore = globalStoredScore;
        changeUser(lastUser);
    }

    var resText = '';
    if(gameFailed){
        resText = "Что-то сломалось";
    }
    else{
        resText = "Конец игры!";
    }
    await showEndScreen(resText, globalStoredScore);

}

// Функция для показа страницы перехода и автоматического перехода на уровень
async function showTransitionScreen(hardLevel, commentText, currRName) {
    // Показать страницу перехода
    document.getElementById("transition-message").textContent = "Уровень " + hardLevel +'. "' + currRName + '"';
    document.getElementById("transition-comment").textContent = commentText;
    document.getElementById("transition-screen").style.display = "flex";
    document.getElementById("transition-screen").style.pointerEvents = "none";
    document.getElementById("transition-next").style.opacity = 0;
    document.getElementById("transition-next").style.animation = "none";

    await new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("transition-screen").style.pointerEvents = "unset";
            document.getElementById("transition-next").style.opacity = 1;
            document.getElementById("transition-next").style.animation = "continueGlow 2s infinite";


            document.getElementById("transition-screen").onclick = function(){
                playSwitch();
                document.getElementById("transition-screen").style.display = "none";
                document.getElementById("transition-comment").textContent = "На этом..." + hardLevel;
                document.getElementById("transition-next").style.opacity = 0;
                document.getElementById("transition-screen").style.pointerEvents = "none";
                resolve(); // Разрешаем промис, сигнализируя об окончании асинхронной операции                
            }

        }, 2000);
    });
}

// Показать экран победы или окончания игры
async function showEndScreen(finText, globScore) {
    return new Promise((resolve) => {
        console.log(finText);
        var goScr = document.getElementById("game-over-screen");
        goScr.style.display = "flex";
        document.getElementById("game-results").textContent = finText;
        var endUser = getCurrentUser();
        document.getElementById("total-game-score").textContent = 'Счёт: ' + globScore + '\r\nРекорд: ' + endUser.userdata.maxGameScore;
        
        document.getElementById("from-end-to-menu-button").onclick = function(){
            playSwitch();
            document.getElementById("game-over-screen").style.display = "none";
            document.getElementById("main-menu").style.display = "flex";
            resolve();
        };
    });
}