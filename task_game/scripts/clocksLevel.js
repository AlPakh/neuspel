async function startClockLevel(hardLevel, levelSettings, globScore){
    return new Promise((resolve, reject) => {
        var currentLevel = hardLevel;

        var docEls = {
            CountdownTimer:  document.getElementById("clock-countdown-timer"),
            ClockGameScreen : document.getElementById("clock-game-screen"),
            ClockScoreText: document.getElementById("clock-score-text"),
            ClockScoreDifference: document.getElementById("clock-score-difference"),
            AdditionalClocksContainer: document.getElementById("additional-clocks"),
            mainHourHand: document.getElementById("hourHand"),
            mainMinuteHand: document.getElementById("minuteHand")
        }

        var gameDOWNTimer; //Таймер, раз в секунду обновляющий счётчик
        var timeLeft = levelSettings.duration; //Счётчик на таймере
        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        
        if(!globScore){
            var clockGameScore = 0; 
        }
        else{
            var clockGameScore = globScore;
        }
        console.log('clock start' + clockGameScore);

        refreshScore(0, clockGameScore);

        docEls.CountdownTimer.textContent = formatTime(timeLeft);
        gameDOWNTimer = setInterval(updateCountdownTimer, 1000); // Таймер уровня
        
        // Показать игровой экран
        docEls.ClockGameScreen.style.display = "flex";

        console.log("Начинаем уровень " + hardLevel);

        const clockAmount = levelSettings.clockAmount;
        const angleDelta = levelSettings.angleDifference;

        //Создаём маленькие часы для примера задания
        var clockValues = [];
        for (let i = 0; i < clockAmount; i++) {
            const clock = document.createElement('div');
            clock.classList.add('clock'); 
            clock.id = "addClock" + i;
            console.log(clock.id);
            clock.classList.add('littleClock'); 
            docEls.AdditionalClocksContainer.appendChild(clock);

            const rMinutes = Math.floor(Math.random()*12);
            const rHours = Math.floor(Math.random()*12);

            const hHand = document.createElement('div');
            hHand.classList.add('hand'); 
            hHand.classList.add('hourHand'); 
            hHand.style.transform = `rotate(${rHours*30}deg)`;

            clock.appendChild(hHand);

            const mHand = document.createElement('div');
            mHand.classList.add('hand'); 
            mHand.classList.add('minuteHand'); 
            mHand.style.transform = `rotate(${rMinutes*30}deg)`;

            clock.appendChild(mHand);

            clockValues.push([rHours, rMinutes, clock]);
        }

        console.log(clockValues);
    
        //сбрасываем положение основных стрелок 
        if(currentLevel == 1){
            docEls.mainHourHand.style.transform = `rotate(${11}deg)`;
            docEls.mainMinuteHand.style.transform = `rotate(${1}deg)`;
        }
        else{
            docEls.mainHourHand.style.transform = `rotate(${(Math.floor(Math.random()*12)*30)+15}deg)`;
            docEls.mainMinuteHand.style.transform = `rotate(${(Math.floor(Math.random()*12)*30)+15}deg)`;
        }


        // Функция обновления таймера обратного отсчёта
        async function updateCountdownTimer() {
            if (timeLeft > 0) {
                timeLeft--;
                docEls.CountdownTimer.textContent = formatTime(timeLeft);

                checkHandPositions();
            }
            else {
                clearInterval(gameDOWNTimer);

                if(clockValues.length != 0){
                    clockValues.forEach(lClock => {
                        var diffScore = -1*Math.floor(levelSettings.punishment*1000);
                        clockGameScore += diffScore;
                        refreshScore(diffScore, clockGameScore);
                    });
                }

                await endLevel(); // Завершить уровень
            }
        }

        // Форматирование времени для отображения
        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let sec = seconds % 60;
            return minutes.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
        }

        //Проверка, совпадает ли положение управляемых стрелок хотя бы с одним из маленьких циферблатов
        function checkHandPositions(){
            const hourHandRotation = getRotation(document.getElementById("hourHand"));
            const minuteHandRotation = getRotation(document.getElementById("minuteHand"));

            console.log(`[${hourHandRotation}, ${minuteHandRotation}] — СТРЕЛКИ ОТСТАЛИ`);

            // Нормализуем углы (значения углов от -90 до 270)
            const normalizedHourHandRotation = hourHandRotation > 270 ? hourHandRotation - 360 : hourHandRotation;
            const normalizedMinuteHandRotation = minuteHandRotation > 270 ? minuteHandRotation - 360 : minuteHandRotation;

            var foundValue;
            var hourDifference;
            var minuteDifference;

            for (let i = 0; i < clockValues.length; i++) {
                const [expectedHour, expectedMinute] = clockValues[i];
                const expectedHourAngle = expectedHour * 30;
                const expectedMinuteAngle = expectedMinute * 30;
        
                // Вычисляем разницу между ожидаемым углом и углом поворота стрелки
                hourDifference = Math.abs(expectedHourAngle - normalizedHourHandRotation)%360;
                minuteDifference = Math.abs(expectedMinuteAngle - normalizedMinuteHandRotation)%360;

                console.log(`[${hourDifference}, ${minuteDifference}] — разница`);
        
                // Проверяем, входят ли разницы в пределы погрешности
                if ((hourDifference >= 360-angleDelta || hourDifference <= angleDelta) && (minuteDifference >= 360-angleDelta || minuteDifference <= angleDelta)) {
                    console.log('Matching clock found:', clockValues[i]);
                    foundValue = i;
                    break; // Если нужно прекратить поиск после первого совпадения
                }
            }

            if(foundValue || foundValue == 0){
                clockValues[foundValue][2].style.opacity = "0";
                clockValues.splice(foundValue, 1);
                
                playSuccess();
                
                console.log(`${clockValues[foundValue]} — НАШЛИ \t ${hourDifference} ${hourDifference}`);

                hourDifference = hourDifference > 300 ? 360 - hourDifference : hourDifference;
                minuteDifference = minuteDifference > 300 ? 360 - minuteDifference : minuteDifference;
                
                console.log(`${hourDifference} ${hourDifference}`);


                var diffScore = Math.floor(levelSettings.punishment*100*(angleDelta*2-Math.abs(hourDifference)-Math.abs(minuteDifference)));
                clockGameScore += diffScore;
                refreshScore(diffScore, clockGameScore);

                if(currentLevel > 1){
                    document.querySelectorAll('.littleClock').forEach(lClock => {
                        lClock.style.order = `${Math.floor(Math.random()*7)-3}`;
                    });

                    if(currentLevel == 3){
                        stopDragging();

                        docEls.mainHourHand.style.transform = `rotate(${(Math.floor(Math.random()*12)*30)+15}deg)`;
                        docEls.mainMinuteHand.style.transform = `rotate(${(Math.floor(Math.random()*12)*30)+15}deg)`;
                    }
                }

                if(clockValues.length == 0){
                    var diffScore = timeLeft*levelSettings.punishment*500;
                    diffScore = currentLevel == 1 ? diffScore/5 : diffScore; 
                    clockGameScore += diffScore;
                    refreshScore(diffScore, clockGameScore);

                    endLevel();
                }
            }
        };




        //Хтонь, отвечающая за поворот стрелок
        let isDraggingHour = false;
        let isDraggingMinute = false;
        let initialHourAngle = 0;
        let initialMinuteAngle = 0;

        docEls.mainHourHand.addEventListener("mousedown", startDraggingHour);
        docEls.mainMinuteHand.addEventListener("mousedown", startDraggingMinute);

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDragging);

        function startDraggingHour(e) {
            isDraggingHour = true;
            const rect = docEls.mainHourHand.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            initialHourAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - getRotation(docEls.mainHourHand);
        }

        function startDraggingMinute(e) {
            isDraggingMinute = true;
            const rect = docEls.mainMinuteHand.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            initialMinuteAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - getRotation(docEls.mainMinuteHand);
        }

        function drag(e) {
            if (isDraggingHour) {
                const angle = calculateAngle(e.clientX, e.clientY, docEls.mainHourHand, initialHourAngle);
                docEls.mainHourHand.style.transform = `rotate(${angle}deg)`;
            }

            if (isDraggingMinute) {
                const angle = calculateAngle(e.clientX, e.clientY, docEls.mainMinuteHand, initialMinuteAngle);
                docEls.mainMinuteHand.style.transform = `rotate(${angle}deg)`;
            }
        }

        function stopDragging() {
            isDraggingHour = false;
            isDraggingMinute = false;
        }

        function calculateAngle(mouseX, mouseY, element, initialAngle) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - initialAngle;
            return angle;
        }

        function getRotation(element) {
            const st = window.getComputedStyle(element, null);
            const tr = st.getPropertyValue("transform");
            if (!tr || tr === "none") return 0; // Если свойство transform не определено или равно "none", возвращаем 0
            const values = tr.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            return angle;
        }






        

        // Завершение уровня
        async function endLevel() {
            //alert('Уровень ' + currentLevel + ' пройден!');
            timeLeft = 0;

            stopDragging();

            docEls.mainHourHand.removeEventListener("mousedown", startDraggingHour);
            docEls.mainMinuteHand.removeEventListener("mousedown", startDraggingMinute);

            clearInterval(gameDOWNTimer);
            clearTimeout(gameDOWNTimer);

            const lilClocks = document.querySelectorAll('.littleClock');
            lilClocks.forEach(lClock => {
                lClock.style.opacity = "1";
                delete lClock.dataset;
                docEls.AdditionalClocksContainer.removeChild(lClock);
            });

            document.getElementById("additional-clocks").innerHTML = "";

            playLevel();

            setTimeout(() => {
                docEls.ClockGameScreen.style.display = "none";
                resolve(clockGameScore);
                console.log('clock success' + clockGameScore);

                clockGameScore = 0;
                docEls.ClockScoreText.textContent = "0".repeat(12 - clockGameScore.toString().length) + clockGameScore.toString();
            }, 2000);
        }

        //Обновляем таймер
        function refreshScore(diffScore, Score){
            docEls.ClockScoreText.textContent = "0".repeat(12-Score.toString().length) + Score.toString();
            docEls.ClockScoreDifference.textContent = diffScore.toString();
            if(diffScore > 0){
                docEls.ClockScoreDifference.classList.remove('scoreplus');
                docEls.ClockScoreDifference.classList.remove('scoreminus');
                docEls.ClockScoreDifference.classList.add('scoreplus');
            }
            else if(diffScore < 0){
                docEls.ClockScoreDifference.classList.remove('scoreplus');
                docEls.ClockScoreDifference.classList.remove('scoreminus');
                docEls.ClockScoreDifference.classList.add('scoreminus');
            }
            else{
                docEls.ClockScoreDifference.classList.remove('scoreplus');
                docEls.ClockScoreDifference.classList.remove('scoreminus');
            }


            docEls.ClockScoreDifference.classList.remove('score-animation');
            docEls.ClockScoreDifference.offsetHeight;
            docEls.ClockScoreDifference.classList.add('score-animation');
        }

    });
}

