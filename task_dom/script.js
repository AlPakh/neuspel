document.addEventListener('DOMContentLoaded', function() {
    // Массив вопросов и ответов
    if(screen.orientation.type == "portrait-primary" || screen.orientation.type == "portrait-secondary" ) alert("Пожалуйста, поверните экран");

    const masQuestions = [
        {
            arrQuestions: "Если человека назвали мордофиля, то это…",
            arrAnswers: [
                { text: "Значит, что он тщеславный.", isCorrect: true }, 
                { text: "Значит, что у него лицо как у хряка.", isCorrect: false },
                { text: "Значит, что чумазый.", isCorrect: false }
            ],
            arrExplanation: "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный."
        },
        {
            arrQuestions: "«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
            arrAnswers: [
                { text: "Он маленький и невзрачный.", isCorrect: true },
                { text: "Он тот еще алкоголик.", isCorrect: false },
                { text: "Он не держит свое слово.", isCorrect: false }
            ],
            arrExplanation: "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи."
        },
        {
            arrQuestions: "Если человека прозвали пятигузом, значит, он…",
            arrAnswers: [
                { text: "Не держит слово.", isCorrect: false },
                { text: "Изменяет жене", isCorrect: false },
                { text: "Может сесть сразу на пять стульев.", isCorrect: true }
            ],
            arrExplanation: "Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек."
        },
        {
            arrQuestions: "Кто такой шлындра?",
            arrAnswers: [
                { text: "Обманщик.", isCorrect: false },
                { text: "Нытик.", isCorrect: false },
                { text: "Бродяга.", isCorrect: true }
            ],
            arrExplanation: "Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться."
        }
    ];

    // Перемешивание вопросов и ответов
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random()*(i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(masQuestions);
    masQuestions.forEach(question => shuffle(question.arrAnswers));

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let isAnswerSelected = false;

    const mainContainer = document.getElementById('quiz-container');
    const questionsLeft = document.getElementById('questionsLeft');
    const feedback = document.getElementById('feedback');
    const results = document.getElementById('results');

    function displayQuestion() { //Вывод
        if (currentQuestionIndex < masQuestions.length) { //Пока вопросы не закончились
            const question = masQuestions[currentQuestionIndex];

            //Создаем новый блок в основной контейнер викторины
            const blockContainer = document.createElement('div');
            blockContainer.classList.add('container');
            blockContainer.classList.add('block');
            mainContainer.appendChild(blockContainer);

            // Создаем новый контейнер для вопроса
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question');
            questionContainer.style.pointerEvents = 'none'; //иначе после выбора ответа можно будет закликивать вопрос
            questionContainer.textContent = `Вопрос ${currentQuestionIndex + 1}: ${question.arrQuestions}`;

            // Создаем новый контейнер для ответов
            const answersContainer = document.createElement('div');
            answersContainer.classList.add('answers');

            question.arrAnswers.forEach((answer, index) => {
                const answerDiv = document.createElement('div');
                answerDiv.textContent = answer.text;
                answerDiv.classList.add('answ');
                answerDiv.classList.add('no');
                answerDiv.onclick = () => chooseAnswer(answer, answerDiv, answersContainer, questionContainer, question);
                answersContainer.appendChild(answerDiv);
            });

            // Добавляем вопрос и ответы в новый блок
            blockContainer.appendChild(questionContainer);
            blockContainer.appendChild(answersContainer);

            isAnswerSelected = false;
        } 
        else { //Если вопросы закончились, смотрим результат
            feedback.style.display = 'none';
            results.style.display = 'block';
            questionsLeft.style.display = 'block';
            questionsLeft.innerText = "Вопросы закончились";
            results.innerText = `Вы ответили правильно на ${correctAnswers} из ${masQuestions.length} вопросов.`;
        }
    }

    function chooseAnswer(answer, answerDiv, answersContainer, questionContainer, question) { //Логика
        if (isAnswerSelected) return;
        isAnswerSelected = true;

        mainContainer.style.pointerEvents = 'none'; //После выбора ответанельзя нажимать другие кнопки

        answerDiv.classList.remove('no'); //Убираем класс, позволяющий менять состояние кнопок

        //Визуальные флаги
        if (answer.isCorrect) { 
            correctAnswers++;
            answerDiv.classList.add('correct');
            feedback.innerHTML = `Правильно! <br> ${masQuestions[currentQuestionIndex].arrExplanation}`;
            questionContainer.style.color = 'green';
        } 
        else {
            answerDiv.classList.add('incorrect');
            feedback.textContent = 'Неправильно!';
            questionContainer.style.color = 'red';
        }

        //Анимация исчезновения для всех ответов кроме выбранного
        masQuestions[currentQuestionIndex].arrAnswers.forEach((ans, index) => {
            if (ans !== answer) {
                answersContainer.children[index].classList.add('vanish');
            }
        });

        //При нажатии на вопрос показывать правильный ответ
        questionContainer.addEventListener('click', () => {
            showCorrectAnswer(answersContainer, question.arrAnswers);
        });

        // По таймеру скрываем блоки, очищаем пояснение, следующий вопрос
        setTimeout(() => {
            masQuestions[currentQuestionIndex].arrAnswers.forEach((ans, index) => {
                if (ans !== answer) {
                    answersContainer.children[index].style.display = 'none';
                }
            });
            setTimeout(() => {
                    answerDiv.style.display = 'none';
                    feedback.innerHTML = '';
                    currentQuestionIndex++;
                    displayQuestion();    //Следующий вопрос
                    questionContainer.style.pointerEvents = 'auto'; 
            }, 2000);
        }, 2000);

        mainContainer.style.pointerEvents = 'auto'; //При появлении нового вопроса снова можно тыкать кнопки
    }

    displayQuestion(); //Следующий вопрос (если убрать его отсюда или из таймера, всё ломается).
});

function showCorrectAnswer(answersContainer, answers) {
    for (let i = 0; i < answersContainer.children.length; i++) {
        const answerDiv = answersContainer.children[i];
        if (answers[i].isCorrect) {
            answerDiv.classList.remove('vanish');
            answerDiv.style.display = 'flex'; // Показать правильный ответ
            answerDiv.style.pointerEvents = 'none';
            answerDiv.style.color = '#ababab'
        } else {
            answerDiv.style.display = 'none'; // Скрыть остальные ответы
        }
    }
}