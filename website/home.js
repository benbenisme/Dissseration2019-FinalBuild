var levelSelectionButton = document.getElementById('levelSelectionButton');
var playButton = document.getElementById('playButton');
var levelDetailsArea = document.getElementById('levelDetailsArea');
var levelStatus = [];

let elementsArray = document.querySelectorAll(".levelButton");
let checkmarksArray = document.querySelectorAll(".checkmark");

console.log(elementsArray);
elementsArray.forEach(function (elem) {
    elem.addEventListener('click', function () {     
        removeHighlights();
        console.log(elem.innerText);
        displayLevelDetails(elem.innerText);
        elem.classList.add('active');
    });
});
function removeHighlights() {
    elementsArray.forEach(function (elem) {
        elem.classList.remove('active');
    });
}

playButton.addEventListener('click', function () {
    changePage(levelCode);
})


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setLevelStatus() {
    
    var levelProgression = getCookie('levelProgression');
    if (levelProgression === '') {
        setCookie('levelProgression', 0, 7);
        levelProgression = 0;
    }
    console.log(levelProgression);
    levelProgression = Number(levelProgression);
    for (var i = levelProgression + 1; i < elementsArray.length; i++) {
        elementsArray[i].disabled = "true";
    }     
    for (var i = levelProgression; i < elementsArray.length; i++) {
        checkmarksArray[i].innerHTML = '';
    }

}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function displayLevelDetails(levelName) {
    levelCode = levelNameToCode(levelName);
    switch (levelCode) {
        case 0:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Tutorial Level</h1><div><div>'
                + '<h3>Explains the various parts of the game layout</h3>'
                + '<h3>Its short, do not worry!</h3>';
            break;
        case 2:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level One</h1><div><div>'
                + '<h3>Moving hands & grabbing and placing books</h3>';
            break;
        case 2:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Two</h1><div><div>'
                + '<h3>Moving hands & grabbing and placing books</h3>';
            break;
        case 3:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Three</h1><div><div>'
                + '<h3>Swapping books</h3>'
            break;            
        case 4:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Four</h1><div><div>'
                + '<h3>Conditional block use</h3>'
                + '<h3>Aswell as the book comparion block</h3>';
            break;
        case 5:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Five</h1><div><div>'
                + '<h3>Hand movement abstracted away from indexing</h3>'
                + '<h3>Move the hand along the shelf</h3>';
            break;
        case 6:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Six</h1><div><div>'
                + '<h3>Introduces loops</h3>'
                + '<h3>In particular the For/Count loop block</h3>';
            break;
        case 7:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Seven</h1><div><div>'
                + '<h3>Combining previously learnt knowledge</h3>';
            break;
        case 8:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Eight</h1><div><div>'
                + '<h3>Introduces While loops</h3>'
                + '<h3>In addition to the ability to set and change varible values</h3>';
            break;
        case 9:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Nine</h1><div><div>'
                + '<h3>Hand movement abstracted away from indexing</h3>'
                + '<h3>Move the hand along the shelf</h3>';
            break;
        case 10:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Ten</h1><div><div>'
                + '<h3>Introduces Booleans</h3>'
                + '<h3>Use booleans alongside While loops</h3>';
            break;
        case 11:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Eleven</h1><div><div>'
                + '<h3>Nested loops</h3>'
                + '<h3>Its one loop inside of another! incredible stuff</h3>';
            break;
        case 12:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Twelve</h1><div><div>'
                + '<h3>Teaches the basic concept of repeated iterations</h3>';
            break;        
        case 13:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Thirteen</h1><div><div>'
                + '<h3>Learn the ceoncept of -Bubbling- a value!</h3>'
                + '<h3>Basically a single iteration of bubble sort</h3>';
            break;
        case 14:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Fourteen</h1><div><div>'
                + '<h3>Un-optimized bubble sort</h3>';
            break;
        case 15:
            levelDetailsArea.innerHTML = '<div class="row"><div class="col-sm-12">'
                + '<h1>Level Fifthteen</h1><div><div>'
                + '<h3>Optimized bubble sort</h3>';
            break;
       

    }

}

function levelNameToCode(levelName) {
    switch (levelName) {
        case 'Tutorial':
            return 0;
        case 'Level 1':
            return 1;
        case 'Level 2':
            return 2;
        case 'Level 3':
            return 3;
        case 'Level 4':
            return 4;
        case 'Level 5':
            return 5;
        case 'Level 6':
            return 6;
        case 'Level 7':
            return 7;
        case 'Level 8':
            return 8;
        case 'Level 9':
            return 9;
        case 'Level 10':
            return 10;
        case 'Level 11':
            return 11;
        case 'Level 12':
            return 12;
        case 'Level 13':
            return 13;
        case 'Level 14':
            return 14;       
    }
}

function changePage(level) {
    document.location.href = 'test' + level + '.html';
}

function setupHome() {
    setLevelStatus();
    levelDetailsArea.innerHTML = '<h3>Please Select a level from the list on the left<br><br><br>'
        + 'Details of the level will be displayed here<br><br><br>'
        + 'To unlock levels you must first complete the ones that come before!</h3>';
}
setupHome();