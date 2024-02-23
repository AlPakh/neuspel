//Получить массив пользователей
function getUsers(){
    //Если это первое открытие страницы, создать массив пользователей
    if(!localStorage.getItem('users')){
        const user = {username: 'БУРЕВЕСТНИК', userdata: {firstLaunch: 'false', levelReached: 0, maxGameScore: 0}}
        const users = [user];
        localStorage.setItem("users", JSON.stringify(users));
        return users;
    }
    else{
        //document.getElementById('title').innerHTML = storedArray.user.username;
        return JSON.parse(localStorage.getItem("users"));
    }
}

//Получить последнего пользователя
function getCurrentUser(){
    const users = getUsers();
    return users[users.length-1];
}

//Изменить последнего пользователя
function changeUser(changedUser){
    const users = getUsers();
    users[users.length-1] = changedUser;
    localStorage.setItem("users", JSON.stringify(users));
}

//Добавить нового пользователя/Открыть старого пользователя
function newUser(newUserName){
    const users = getUsers();

    //Проверка, что пользователя с таким именем ещё не было
    var usernameAlreadyExists = false;
    var existingNameId = 0;
    for(var i = 0; i < users.length; i++){
        if(users[i].username == newUserName){
            usernameAlreadyExists = true;
            existingNameId = i;
            break;
        }
    }
    if(usernameAlreadyExists){
        //Если был, переместить в конец массива
        const oldNewUser = users[i];
        users.splice(existingNameId, 1);
        users.push(oldNewUser);
    }
    else{
        //Если не было - добавить нового
        const newUser = {username: newUserName, userdata: {firstLaunch: 'false', levelReached: 0, maxGameScore: 0}}
        users.push(newUser);
    }

    localStorage.setItem("users", JSON.stringify(users));
}
