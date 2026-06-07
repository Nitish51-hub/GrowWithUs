/* ==========================================
   Grow With Us - product.js
   Single Product Page Functionality
========================================== */

// ===============================
// Load Products
// ===============================

const products =
JSON.parse(
localStorage.getItem("products")
) || [];

const selectedId =
parseInt(
localStorage.getItem("selectedProduct")
);

const product =
products.find(
item => item.id === selectedId
);

// ===============================
// Elements
// ===============================

const productImage =
document.getElementById("productImage");

const productName =
document.getElementById("productName");

const productPrice =
document.getElementById("productPrice");

const productRating =
document.getElementById("productRating");

const productDescription =
document.getElementById("productDescription");

const quantityInput =
document.getElementById("quantity");

// ===============================
// Load Product Details
// ===============================

function loadProduct(){

    if(!product){

        document.body.innerHTML =

        "<h1 style='text-align:center;margin-top:50px;'>Product Not Found</h1>";

        return;

    }

    if(productImage){

        productImage.src =
        product.image;

    }

    if(productName){

        productName.innerText =
        product.name;

    }

    if(productPrice){

        productPrice.innerText =
        "₹" + product.price;

    }

    if(productRating){

        productRating.innerText =
        "⭐ " + product.rating;

    }

    if(productDescription){

        productDescription.innerText =
        product.description;

    }

}

loadProduct();

// ===============================
// Quantity
// ===============================

function increaseQty(){

    quantityInput.value =
    parseInt(quantityInput.value)+1;

}

function decreaseQty(){

    if(
    parseInt(quantityInput.value)>1
    ){

        quantityInput.value =
        parseInt(quantityInput.value)-1;

    }

}

// ===============================
// Add To Cart
// ===============================

function addToCart(){

    let cart =
    JSON.parse(
    localStorage.getItem("cart")
    ) || [];

    const qty =
    parseInt(
    quantityInput.value
    );

    const exist =
    cart.find(
    item=>item.id===product.id
    );

    if(exist){

        exist.quantity += qty;

    }

    else{

        cart.push({

            ...product,

            quantity:qty

        });

    }

    localStorage.setItem(

    "cart",

    JSON.stringify(cart)

    );

    updateCartCount();

    alert(

    "Product Added To Cart"

    );

}

// ===============================
// Buy Now
// ===============================

function buyNow(){

    addToCart();

    window.location =
    "checkout.html";

}

// ===============================
// Wishlist
// ===============================

function addWishlist(){

    let wishlist =

    JSON.parse(

    localStorage.getItem(

    "wishlist"

    )

    ) || [];

    const exist =

    wishlist.find(

    item=>item.id===product.id

    );

    if(exist){

        alert(

        "Already Added"

        );

        return;

    }

    wishlist.push(product);

    localStorage.setItem(

    "wishlist",

    JSON.stringify(

    wishlist

    )

    );

    alert(

    "Added To Wishlist"

    );

}

// ===============================
// Cart Badge
// ===============================

function updateCartCount(){

const badge =
document.getElementById(
"cartCount"
);

if(!badge){

return;

}

let cart =

JSON.parse(

localStorage.getItem(

"cart"

)

)||[];

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

badge.innerText=total;

}

updateCartCount();

// ===============================
// Related Products
// ===============================

function loadRelated(){

const container=

document.getElementById(
"relatedProducts"
);

if(!container){

return;

}

container.innerHTML="";

products

.filter(

item=>

item.category===

product.category

&&

item.id!==product.id

)

.slice(0,4)

.forEach(item=>{

container.innerHTML+=`

<div class="card">

<img src="${item.image}">

<h3>

${item.name}

</h3>

<p>

₹${item.price}

</p>

<button

onclick="openProduct(${item.id})"

>

View

</button>

</div>

`;

});

}

loadRelated();

// ===============================
// Open Related Product
// ===============================

function openProduct(id){

localStorage.setItem(

"selectedProduct",

id

);

window.location=

"product.html";

}

// ===============================
// Delivery Check
// ===============================

const checkBtn=

document.getElementById(
"checkDelivery"
);

if(checkBtn){

checkBtn.addEventListener(

"click",

function(){

const pin=

document.getElementById(
"pincode"
).value;

if(pin.length!==6){

alert(

"Enter Valid Pincode"

);

return;

}

alert(

"Delivery Available in Your Area"

);

}

);

}

// ===============================
// Share Product
// ===============================

const shareBtn=

document.getElementById(
"shareBtn"
);

if(shareBtn){

shareBtn.onclick=

function(){

navigator.clipboard.writeText(

window.location.href

);

alert(

"Product Link Copied"

);

};

}

// ===============================
// Button Events
// ===============================

document.getElementById(
"plusBtn"
)?.addEventListener(

"click",

increaseQty

);

document.getElementById(
"minusBtn"
)?.addEventListener(

"click",

decreaseQty

);

document.getElementById(
"cartBtn"
)?.addEventListener(

"click",

addToCart

);

document.getElementById(
"buyBtn"
)?.addEventListener(

"click",

buyNow

);

document.getElementById(
"wishlistBtn"
)?.addEventListener(

"click",

addWishlist

);

// ===============================
// Export
// ===============================

window.openProduct =
openProduct;

window.addToCart =
addToCart;

window.buyNow =
buyNow;