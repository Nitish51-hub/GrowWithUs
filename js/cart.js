/* ==========================================
   Grow With Us - cart.js
   Shopping Cart Functionality
========================================== */

// ===============================
// Get Cart
// ===============================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const cartContainer =
document.getElementById("cartItems");

const subtotalElement =
document.getElementById("subtotal");

const discountElement =
document.getElementById("discount");

const deliveryElement =
document.getElementById("delivery");

const totalElement =
document.getElementById("total");

// ===============================
// Load Cart
// ===============================

function loadCart(){

    if(!cartContainer) return;

    cartContainer.innerHTML="";

    if(cart.length===0){

        cartContainer.innerHTML=`

        <div class="emptyCart">

            <h2>Your Cart is Empty</h2>

            <p>Add some gym products to continue shopping.</p>

            <a href="products.html">
                <button>Shop Now</button>
            </a>

        </div>

        `;

        updateSummary();

        return;

    }

    cart.forEach(item=>{

        cartContainer.innerHTML+=`

        <div class="cartItem">

            <img src="${item.image}" alt="${item.name}">

            <div class="itemInfo">

                <h2>${item.name}</h2>

                <p>${item.description || ""}</p>

                <h3 class="price">
                    ₹${item.price}
                </h3>

                <div class="quantityBox">

                    <button
                    onclick="decreaseQuantity(${item.id})">
                    -
                    </button>

                    <input
                    value="${item.quantity}"
                    readonly>

                    <button
                    onclick="increaseQuantity(${item.id})">
                    +
                    </button>

                </div>

                <div class="itemActions">

                    <button
                    class="removeBtn"
                    onclick="removeItem(${item.id})">

                    Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    updateSummary();

}

// ===============================
// Increase Quantity
// ===============================

function increaseQuantity(id){

    cart.forEach(item=>{

        if(item.id===id){

            item.quantity++;

        }

    });

    saveCart();

}

// ===============================
// Decrease Quantity
// ===============================

function decreaseQuantity(id){

    cart.forEach(item=>{

        if(item.id===id){

            if(item.quantity>1){

                item.quantity--;

            }

        }

    });

    saveCart();

}

// ===============================
// Remove Product
// ===============================

function removeItem(id){

    cart = cart.filter(

        item=>item.id!==id

    );

    saveCart();

}

// ===============================
// Save Cart
// ===============================

function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    loadCart();

    updateCartBadge();

}

// ===============================
// Summary
// ===============================

function updateSummary(){

    let subtotal=0;

    cart.forEach(item=>{

        subtotal +=
        item.price *
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
// Coupon
// ===============================

const couponBtn =
document.getElementById(
"applyCoupon"
);

if(couponBtn){

couponBtn.addEventListener(

"click",

function(){

const code =

document.getElementById(
"couponCode"
).value
.trim()
.toUpperCase();

if(code==="GYM10"){

alert(

"Coupon Applied! ₹300 Discount"

);

let subtotal=0;

cart.forEach(item=>{

subtotal+=
item.price*
item.quantity;

});

const total=

subtotal-300+99;

if(totalElement){

totalElement.innerText=
"₹"+total;

}

}

else{

alert(

"Invalid Coupon"

);

}

}

);

}

// ===============================
// Checkout
// ===============================

const checkoutBtn =
document.getElementById(
"checkoutBtn"
);

if(checkoutBtn){

checkoutBtn.addEventListener(

"click",

function(){

if(cart.length===0){

alert(

"Cart Empty"

);

return;

}

window.location=
"checkout.html";

}

);

}

// ===============================
// Continue Shopping
// ===============================

const continueBtn =
document.getElementById(
"continueShopping"
);

if(continueBtn){

continueBtn.addEventListener(

"click",

function(){

window.location=
"products.html";

}

);

}

// ===============================
// Cart Count Badge
// ===============================

function updateCartBadge(){

const badge=
document.getElementById(
"cartCount"
);

if(!badge) return;

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

badge.innerText=total;

}

updateCartBadge();

// ===============================
// Clear Cart
// ===============================

const clearBtn =
document.getElementById(
"clearCart"
);

if(clearBtn){

clearBtn.addEventListener(

"click",

function(){

if(

confirm(
"Clear entire cart?"
)

){

cart=[];

saveCart();

}

}

);

}

// ===============================
// Initial Load
// ===============================

loadCart();

// ===============================
// Export
// ===============================

window.increaseQuantity =
increaseQuantity;

window.decreaseQuantity =
decreaseQuantity;

window.removeItem =
removeItem;