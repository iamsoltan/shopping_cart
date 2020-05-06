// global vars
let reglogform = document.getElementById("reglogform");
let logform = document.getElementById("myFormLogin");
let regform = document.getElementById("myFormRegister");

let regbtn = document.getElementById("registerbtn");
let logbtn = document.getElementById("loginbtn");
let logoutbtn = document.getElementById("logoutbtn");

let usersObjects = [];
let users = [];

//last user is still connected ?
let lastUser = "not";
//hide show items

function show(x) {
  x.style.display = "block";
}
function showFlex(x) {
  x.style.display = "flex";
}
function hide(x) {
  x.style.display = "none";
}

// open and close of reg log forms
function openFormLogin() {
  showFlex(reglogform);
  hide(regform);
  show(logform);
}
function closeFormLogin() {
  hide(reglogform);
  hide(regform);
  hide(logform);
}

function openFormRegister() {
  showFlex(reglogform);
  show(regform);
  hide(logform);
}
function closeFormRegister() {
  hide(reglogform);
  hide(regform);
  hide(logform);
}

// hide modal reglogform
window.onclick = function (event) {
  if (event.target == reglogform) {
    hide(reglogform);
  }
};

/********************************* user object Constructor ************************ */
function User(y) {
  this.name = "";
  this.email = "";
  this.password = "";
  this.adress = "";
  this.islogged = false;

  this.login = function () {
    this.islogged = true;
  };
  this.logout = function () {
    this.islogged = false;
  };
}
/*------------------------------Login function--------------------------------------------- */

function login() {
  let emaillogin = document.getElementById("emailLogin").value;
  let passwordlogin = document.getElementById("passwordLogin").value;

  if (users.includes(emaillogin) == true && lastUser == "not") {
    if (window[emaillogin].password == passwordlogin) {
      window[emaillogin].login();
      lastUser = "still";
      closeFormLogin();
      hide(reglogform);
      hide(regbtn);
      hide(logbtn);
      show(logoutbtn);
      hiUser(window[emaillogin].name);

      alert("Congrats !,you are succussfully logged in !");
    } else {
      alert("right Email But wrong password!");
    }
  } else {
    alert("whether wrong Email or not registred , register first please !");
  }
}

/*------------------------------Register function--------------------------------------------- */
let NameReg = document.getElementById("nameRegister");
let EmailReg = document.getElementById("emailRegister");
let PassReg = document.getElementById("passwordRegister");
let AdressReg = document.getElementById("adressRegister");

function register() {
  let emailRegister = EmailReg.value;
  let passwordRegister = PassReg.value;
  let nameRegister = NameReg.value;
  let adressRegister = AdressReg.value;
  if (controlN(NameReg) == true && controlM(EmailReg) == true) {
    if (controlP(PassReg) == true && controlA(AdressReg)) {
      if (users.includes(emailRegister) == true && lastUser == "not") {
        alert("you can't register with the same email more than once !");
      } else {
        window[emailRegister] = new User();
        window[emailRegister].email = emailRegister;
        window[emailRegister].password = passwordRegister;
        window[emailRegister].name = nameRegister;
        window[emailRegister].adress = adressRegister;
        users.push(emailRegister);
        usersObjects.push(window[emailRegister]);

        alert("succussfull registration !  you may now log in !");
        //document.getElementById("content").innerHTML = JSON.stringify(usersObjects, null, 4);
        closeFormRegister();
      }
    }
  }
}

/*--------------------------------logout------------------------------------------- */

function logout() {
  lastUser = "not";
  hide(reglogform);
  hide(regform);
  hide(logform);
  hide(logoutbtn);
  show(regbtn);
  show(logbtn);
  byUser();
}

/*--------------------------------control Email with regex------------------------------------------- */

function controlM(x) {
  const patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (patt.test(x.value) == false) {
    x.style.color = "red";
    x.value = "please enter a valid Email adress !";
    setTimeout(() => {
      x.value = "";
      x.style.color = "black";
      x.placeholder = "please enter a valid Email adress !";
    }, 1000);
  }
  return patt.test(x.value);
}

function controlP(z) {
  const pattx = /^\w{8}$/;
  if (pattx.test(z.value) == false) {
    z.value = "";
    z.type = "email";
    z.style.color = "red";
    z.value = "must be 8 characters !";
    setTimeout(() => {
      z.value = "";
      z.type = "password";
      z.style.color = "black";
      z.placeholder = "must be 8 characters !";
    }, 1000);
  }
  return pattx.test(z.value);
}

function controlN(x) {
  if (x.value != "") {
    return true;
  } else {
    x.style.color = "red";
    x.value = "dont leave it empty !";
    setTimeout(() => {
      x.value = "";
      x.style.color = "black";
      x.placeholder = "write your name here !";
    }, 1000);
  }
}
function controlA(x) {
  if (x.value != "") {
    return true;
  } else {
    x.style.color = "red";
    x.value = "dont leave it empty !";
    setTimeout(() => {
      x.value = "";
      x.style.color = "black";
      x.placeholder = "write tour adress here !";
    }, 1000);
  }
}
function hiUser(x) {
  document.getElementById("userName").innerHTML = "Hi " + x + "!";
}
function byUser() {
  document.getElementById("userName").innerHTML = "";
}
