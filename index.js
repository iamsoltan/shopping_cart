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

// hide modal reglogform -->you will find it down with cart window click event


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
  byeUser();
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
function byeUser() {
  document.getElementById("userName").innerHTML = "";
}


/*************************cart.js************************************** */

let addersIndex = [];
let showlog = [];
let priceAdders = document.getElementsByClassName("priceAdder");


for (let i = 0; i < priceAdders.length; i++) {
  priceAdders[i].addEventListener("click", function () {
    disableButton(event);
    addToCartList(event);
  });
}

function subtotal(event) {
  let x = event.target.parentNode.parentNode.nextElementSibling.innerHTML;
  event.target.parentNode.parentNode.nextElementSibling.innerHTML = event.target.parentNode.parentNode.previousElementSibling.innerHTML *1 *(event.target.value * 1);
  updateTotal();
}

function mydeleteRow(event) {
  event.target.parentNode.parentNode.parentNode.parentNode.deleteRow(
    event.target.parentNode.parentNode.parentNode.rowIndex
  );
  
  let n = event.target.parentNode.parentNode.parentNode.children[0].innerHTML;
  n = n*1;
  console.log("n  :  ",n);
  
  enableButton(n);
  removeFromArrays(n);
  updateTotal();
}

function updateTotal() {
  document.getElementById("carted-items-number").innerHTML = addersIndex.length;
  let x = document.getElementById("cart-table");
  let sum = 0;
  for (let i = 1; i < x.rows.length - 1; i++) { sum += x.rows[i].cells[4].innerHTML * 1;}
  document.getElementById("mytotal").innerHTML = sum;
  //


}
function disableButton(event) {
  event.target.disabled = true;
  event.target.innerHTML = "Item added";
}
function enableButton(n) {
  priceAdders[n].disabled = false;
  priceAdders[n].innerHTML = "add to cart";
}

function removeFromArrays(n) {
  addersIndex.splice(addersIndex.indexOf(n),1);
  showlog = [...addersIndex];
  console.log("addersIndex,showlog  ",addersIndex,showlog); 
}

function addToCartList(event) {
  for (let i = 0;i < document.getElementsByClassName("priceAdder").length;i++) {
    if (
      event.target === document.getElementsByClassName("priceAdder")[i] &&
      addersIndex.includes(i) === false
    ) {
      addersIndex.push(i);
      updateTotal();
    }
  }
}

/******************************* showing ********************************** */
function showCart() {
  if (addersIndex.filter((value) => ! showlog.includes(value)).length !== 0) {//if there is new items
    let newItemsArray = addersIndex.filter((value) => ! showlog.includes(value));//just add new items to be showen

    for (let i = 0; i < newItemsArray.length; i++) {
      let table = document.getElementById("cart-table");
      let row = table.insertRow(1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = newItemsArray[i];
      cell2.innerHTML = priceAdders[newItemsArray[i]].dataset.type;
      cell3.innerHTML = priceAdders[newItemsArray[i]].dataset.price;

      let itm = document.getElementById("clonage");
      let cln = itm.cloneNode(true);
      cell4.appendChild(cln);

      cell5.innerHTML = priceAdders[addersIndex[i]].dataset.price;
    }
  updateTotal();
  showlog = [...addersIndex];
}
}

/**********************************modal show hide section************************** */

// Get the modal
let modal = document.getElementById("modal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
  showCart();
  updateTotal();
}


// Get the close element that closes the modal
let close = document.getElementById("cancel");



// When the user clicks on close (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }else
  if (event.target === reglogform) {
    hide(reglogform);
  }
}