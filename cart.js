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
  let x = document.getElementById("cart-table");
  let sum = 0;
  for (let i = 1; i < x.rows.length - 1; i++) { sum += x.rows[i].cells[4].innerHTML * 1;}
  document.getElementById("mytotal").innerHTML = sum;
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
    }
  }
}

/******************************* showing ********************************** */
function show() {
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
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
  show()
  updateTotal();
}


// Get the close element that closes the modal
var close = document.getElementById("cancel");



// When the user clicks on close (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}