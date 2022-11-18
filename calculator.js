// HTML Elements
const buttons = document.querySelectorAll('button');
const screen = document.querySelector('#display');

// Variables
var operator = "NONE";
var currentNum = 0;
var firstNum = 0;
var secNum = 0;

// Functions
function buttPressed(e) {
  console.log(e.key);
  if ("1234567890./*-+=Enter".includes(e.key)){
    var buttVal = e.key;
  } else {
    var buttVal = this.textContent;
  }
  if ("1234567890.".includes(buttVal)) {
    if (buttVal == "." && screen.textContent.includes(".") || screen.textContent.length >= 20) {
      return;
    } else {
      if (screen.textContent == 0 || screen.textContent == "ERROR") {
        screen.textContent = buttVal;
      } else {
        screen.textContent += buttVal;
      }
    }
  } else if ("/*-+".includes(buttVal) && operator == "NONE") {
    operator = buttVal;
    firstNum = parseFloat(screen.textContent);
    resetScreen(0);
  } else if (buttVal == "c") {
    clearAll();
  } else if ("=Enter".includes(buttVal) && firstNum != 0 && operator != "NONE"){
    if (operator == "/"){
      divNums();
    } else if (operator == "*"){
      multNums();
    } else if (operator == "+"){
      sumNums();
    } else if (operator == "-"){
      subNums();
    }
    operator = "NONE";
  }
}

function clearAll() {
  operator = "NONE";
  firstNum = 0;
  secNum = 0;
  currentNum = 0;
  resetScreen(0);
}

function resetScreen(num){
  screen.textContent = "";
  setTimeout(function() {screen.textContent = num;}, 250);
}

function divNums(){
  if (screen.textContent == 0){
    resetScreen("ERROR");
  } else {
    resetScreen(firstNum / parseFloat(screen.textContent));
  }
}

function multNums(){
  resetScreen(firstNum * parseFloat(screen.textContent));
}

function sumNums(){
  resetScreen(firstNum + parseFloat(screen.textContent));
}

function subNums(){
  resetScreen(firstNum - parseFloat(screen.textContent));
}

//Event Listeners
buttons.forEach(button => button.addEventListener('click', buttPressed));
document.addEventListener('keydown', buttPressed);