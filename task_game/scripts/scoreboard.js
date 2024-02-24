document.getElementById("back-to-menu-from-scoreboard").addEventListener("click", function() {
    playSwitch();
    document.getElementById("scoreboard-screen").style.display = "none";
    if(document.getElementById('tabPics')){
        document.getElementById("scoreboard-screen").removeChild(document.getElementById('tabPics'));
    }
    document.getElementById("main-menu").style.display = "flex";
});

function showScoreboard(){
    var storedUsers = getUsers();

    var tab = document.createElement('table');
    tab.id = 'tabPics';
    tab.classList.add('genTable');
    document.getElementById('scoreboard-screen').appendChild(tab);

    var row = document.createElement('tr');
    row.id = 'basic_row';
    document.getElementById('tabPics').appendChild(row);

    var cell = document.createElement('td');
    cell.textContent = ' Корабль '; 
    document.getElementById('basic_row').appendChild(cell);

    
    var cell = document.createElement('td');
    cell.textContent = 'Достиг уровня'; 
    document.getElementById('basic_row').appendChild(cell);

    
    var cell = document.createElement('td');
    cell.textContent = 'Счёт'; 
    document.getElementById('basic_row').appendChild(cell);

    if(storedUsers[storedUsers.length-1].userdata.levelReached == 0 && storedUsers.length == 1){
        var row = document.createElement('tr');
        row.id = 'empty row';
        document.getElementById('tabPics').appendChild(row);
        row.classList.add('rowSmol');

        var cell = document.createElement('td');
        cell.textContent = 'Тут пока пустовато'; 
        cell.colSpan = 3;
        document.getElementById('empty row').appendChild(cell);
    }
    else{
        storedUsers.forEach(element => {
                var row = document.createElement('tr');
                row.id = 'el_' + element.username;
                document.getElementById('tabPics').appendChild(row);
                row.classList.add('rowSmol');

                var cell = document.createElement('td');
                cell.textContent = element.username; 
                document.getElementById('el_' + element.username).appendChild(cell);

                
                var cell = document.createElement('td');
                cell.textContent = element.userdata.levelReached; 
                document.getElementById('el_' + element.username).appendChild(cell);

                
                var cell = document.createElement('td');
                cell.textContent = element.userdata.maxGameScore; 
                document.getElementById('el_' + element.username).appendChild(cell);
            });
        }   
}