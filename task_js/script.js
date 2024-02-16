window.onresize = function (event) {
    var bWid = window.innerWidth < 624;
    var bHei = window.innerHeight < 400;
    if (bWid || bHei) {
        // Показываем предупреждение
        document.querySelector('.warning').style.display = 'flex';
        var izmenit = "";
        if (bWid && bHei) {
            var izmenit = "ШИРИНУ и ВЫСОТУ";
        }
        else if (bHei && !bWid) {
            var izmenit = "ВЫСОТУ";
        }
        else if (bWid && !bHei) {
            var izmenit = "ШИРИНУ";
        }
        document.querySelector('.warning').textContent = "Ваше окно браузера слишком маленькое. Пожалуйста, увеличьте его " + izmenit + " для просмотра.";
    }
    else {
        // Скрываем предупреждение
        document.querySelector('.warning').style.display = 'none';
    }
};

//Вывод окна "Приступим?"
 function toStart() {
    var answer = confirm("Приступаем?");
    if (answer) {
        //alert("ddd");
        alert('Жизнь продолжается, и мы должны двигаться дальше');
        //alert("ggg");
        showInput();
    } else {
        alert("Даже камень движется дальше");
    }
}

//Окно ввода длины пути
function showInput() {
    //alert("asdfghj");
    var length = parseFloat(prompt("Введите длину пути в км:"));

    if (!isNaN(length) && length > 0 && length <= 100) {		
		var content = document.getElementById('content');
		content.style.display = "block";
        addEventListeners(length);
    } 
    else {
        alert("Неверный ввод! Введите число от 1 до 100");
        showInput();
    }
}

    // Функция для добавления обработчиков событий
    function addEventListeners(length) {
        var btnMoto = document.getElementById('motoButton');
        var btnCar = document.getElementById('carButton');
        var fuelRange = document.getElementById('fuelRange');

        btnMoto.addEventListener('click', function () {
            //alert('awwwww');
            checkFuel(length, 5);
        });

        btnCar.addEventListener('click', function () {
            //alert('waaaaaaa');
            checkFuel(length, 10);
        });

        fuelRange.addEventListener('input', function () {
            document.getElementById('fuelValue').textContent = fuelRange.value;
        });
    }

    // Функция для проверки запаса бензина
    function checkFuel(length, fuelConsumption) {
        var fuel = parseFloat(document.getElementById('fuelRange').value);
        //alert(fuel);
        var fuelNeeded = length * fuelConsumption;
        //alert(fuelNeeded);

        if (fuel >= fuelNeeded) {
            document.getElementById('result').innerHTML = `😊`;
        } else {
            document.getElementById('result').innerHTML = `😢`;
        }
    }

//При загрузке страницы появляется всплывающее окно
window.addEventListener('load', toStart);