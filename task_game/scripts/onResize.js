window.onresize = function (event) {
    var bWid = window.innerWidth < 624;
    var bHei = window.innerHeight < 450;
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