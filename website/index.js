var signUpButton = document.getElementById('signUpButton');
var loginButton = document.getElementById('loginButton');
var usernameInput = document.getElementById('usernameInput');

loginButton.addEventListener('click', function () {
    // unchecked = usernameInput.value;
    // if (!isValid(unchecked)) {
    //     alert('Invalid Username, only letters and numbers please');
    //     return false;
    // }
    // username = unchecked.toLowerCase();
    // if (!userExists()) {
    //     alert('Username doesnt seem to exist, please sign up!');
    //     return false;
    // }
    username = 0;
    goToHomePage(username);
})
signUpButton.addEventListener('click', function () {

    unchecked = usernameInput.value;
    if (!isValid(unchecked)) {
        alert('Invalid Username, only letters and numbers please');
        return false;
    }
    username = unchecked.toLowerCase();

    if (userExists()) {
        alert('Username already exists, please sign up!');
        return false;
    }
    addNewUser(username);
    goToHomePage(username);
})

function goToHomePage(username) {
    document.location.href = 'home.html'
    // document.location.href = 'home.html?user=' + username;
}

function userExists(username) {
    if ($.post("userExistsChecker.php",
        {
            user: username
        },) = true) {
            return true;
        }
    return false;
}

function addNewUser(username) {
    $.post("addNewUser.php",
        {
            user: username
        },);
}

function isValid(str) { return /^[a-zA-Z0-9]+$/.test(str); }
