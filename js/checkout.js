/* ==========================================
   Grow With Us - checkout.js
   Checkout & Order Management
========================================== */

// ===============================
// Load Cart & User
// ===============================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

// ===============================
// Elements
// ===============================

const checkoutItems =
document.getElementById("checkoutItems");

const subtotalElement =
document.getElementById("subtotal");

const discountElement =
document.getElementById("discount");

const deliveryElement =
document.getElementById("delivery");

const totalElement =
document.getElementById("total");

const placeOrderBtn =
document.getElementById("placeOrderBtn");

// ===============================
// Load Checkout Summary
// ===============================

function loadCheckout(){

    if(!checkoutItems) return;

    checkoutItems.innerHTML="";

    if(cart.length===0){

        checkoutItems.innerHTML=
        "<h2>Your Cart is Empty</h2>";

        return;

    }

    cart.forEach(item=>{

        checkoutItems.innerHTML+=`

        <div class="summaryItem">

            <span>

            ${item.name}
            ×
            ${item.quantity}

            </span>

            <span>

            ₹${item.price*item.quantity}

            </span>

        </div>

        `;

    });

    calculateTotal();

}

loadCheckout();

// ===============================
// Calculate Total
// ===============================

function calculateTotal(){

    let subtotal=0;

    cart.forEach(item=>{

        subtotal+=
        item.price*
        item.quantity;

    });

    let discount=0;

    if(subtotal>=5000){

        discount=500;

    }

    let delivery=

    subtotal>0 ? 99 : 0;

    let total=

    subtotal-discount+delivery;

    if(subtotalElement)
    subtotalElement.innerText=
    "₹"+subtotal;

    if(discountElement)
    discountElement.innerText=
    "- ₹"+discount;

    if(deliveryElement)
    deliveryElement.innerText=
    "₹"+delivery;

    if(totalElement)
    totalElement.innerText=
    "₹"+total;

}

// ===============================
// Place Order
// ===============================

if(placeOrderBtn){

placeOrderBtn.addEventListener(

"click",

function(){

if(cart.length===0){

alert(
"Your Cart is Empty."
);

return;

}

const fullName=
document.getElementById(
"fullName"
)?.value;

const phone=
document.getElementById(
"phone"
)?.value;

const address=
document.getElementById(
"address"
)?.value;

const city=
document.getElementById(
"city"
)?.value;

const state=
document.getElementById(
"state"
)?.value;

const pincode=
document.getElementById(
"pincode"
)?.value;

if(

!fullName ||
!phone ||
!address ||
!city ||
!state ||
!pincode

){

alert(
"Please fill all address details."
);

return;

}

const payment=

document.querySelector(

'input[name="payment"]:checked'

)?.value;

const order={

id:
"GWU"+
Date.now(),

user:
currentUser?.email ||

"guest",

name:
fullName,

phone,

address,

city,

state,

pincode,

payment,

items:
cart,

date:
new Date()
.toLocaleString(),

status:
"Processing"

};

orders.push(order);

localStorage.setItem(

"orders",

JSON.stringify(orders)

);

// Save into current user

if(currentUser){

currentUser.orders=
currentUser.orders || [];

currentUser.orders.push(order);

localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);

}

// Empty Cart

localStorage.setItem(

"cart",

JSON.stringify([])

);

// Popup

showSuccess();

}

);

}

// ===============================
// Success Popup
// ===============================

function showSuccess(){

const popup=
document.getElementById(
"popup"
);

if(popup){

popup.style.display=
"flex";

}

setTimeout(()=>{

window.location=
"orders.html";

},2500);

}

// ===============================
// Close Popup
// ===============================

const popupBtn=
document.getElementById(
"popupBtn"
);

if(popupBtn){

popupBtn.onclick=function(){

window.location=
"orders.html";

};

}

// ===============================
// Back To Cart
// ===============================

const backBtn=
document.getElementById(
"backCart"
);

if(backBtn){

backBtn.onclick=function(){

window.location=
"cart.html";

};

}

// ===============================
// Payment Selection
// ===============================

const paymentOptions=
document.querySelectorAll(

'input[name="payment"]'

);

paymentOptions.forEach(option=>{

option.addEventListener(

"change",

function(){

const paymentType=

document.getElementById(
"paymentType"
);

if(paymentType){

paymentType.innerText=

this.value;

}

}

);

});

// ===============================
// Prefill User Data
// ===============================

if(currentUser){

const nameInput=
document.getElementById(
"fullName"
);

const phoneInput=
document.getElementById(
"phone"
);

if(nameInput){

nameInput.value=
currentUser.name;

}

if(phoneInput){

phoneInput.value=
currentUser.phone;

}

}

// ===============================
// Validate Pincode
// ===============================

const pin=
document.getElementById(
"pincode"
);

if(pin){

pin.addEventListener(

"keyup",

function(){

if(

this.value.length===6

){

this.style.border=
"2px solid green";

}

else{

this.style.border=
"2px solid red";

}

}

);

}

// ===============================
// Validate Phone
// ===============================

const phoneInput=
document.getElementById(
"phone"
);

if(phoneInput){

phoneInput.addEventListener(

"keyup",

function(){

if(

this.value.length===10

){

this.style.border=
"2px solid green";

}

else{

this.style.border=
"2px solid red";

}

}

);

}

// ===============================
// Export
// ===============================

window.loadCheckout=
loadCheckout;