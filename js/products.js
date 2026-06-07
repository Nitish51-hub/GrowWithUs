/* ==========================================
   Grow With Us - products.js
   Products Page Functionality
========================================== */

// ===============================
// Product Database
// ===============================

const products = [

{
    id:1,
    name:"Optimum Nutrition Whey Protein",
    category:"supplement",
    price:2999,
    rating:4.8,
    image:"https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600",
    description:"Premium whey protein for muscle growth."
},

{
    id:2,
    name:"MuscleBlaze Biozyme Whey",
    category:"supplement",
    price:2599,
    rating:4.7,
    image:"https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=600",
    description:"Fast absorbing whey protein."
},

{
    id:3,
    name:"Creatine Monohydrate",
    category:"supplement",
    price:899,
    rating:4.6,
    image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    description:"Increase strength and recovery."
},

{
    id:4,
    name:"Adjustable Dumbbells",
    category:"equipment",
    price:3499,
    rating:4.9,
    image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
    description:"Premium adjustable dumbbells."
},

{
    id:5,
    name:"Barbell Set",
    category:"equipment",
    price:6499,
    rating:4.8,
    image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
    description:"Heavy duty barbell for strength."
},

{
    id:6,
    name:"Workout Bench",
    category:"equipment",
    price:7999,
    rating:4.7,
    image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600",
    description:"Foldable workout bench."
},

{
    id:7,
    name:"Mass Gainer",
    category:"supplement",
    price:1899,
    rating:4.5,
    image:"https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=600",
    description:"High calorie mass gainer."
},

{
    id:8,
    name:"Resistance Bands",
    category:"equipment",
    price:699,
    rating:4.4,
    image:"https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600",
    description:"Workout bands for home gym."
}

];

// Save for other pages

localStorage.setItem(
    "products",
    JSON.stringify(products)
);

// ===============================
// Render Products
// ===============================

const container =
document.getElementById(
    "productContainer"
);

function renderProducts(data){

    if(!container) return;

    container.innerHTML="";

    data.forEach(product=>{

        container.innerHTML+=`

        <div class="productCard">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <div class="rating">

                ⭐ ${product.rating}

            </div>

            <p>

                ₹${product.price}

            </p>

            <div class="buttons">

                <button
                class="cartBtn"
                onclick="addToCart(${product.id})">

                Add To Cart

                </button>

                <button
                class="buyBtn"
                onclick="viewProduct(${product.id})">

                View

                </button>

            </div>

        </div>

        `;

    });

}

renderProducts(products);

// ===============================
// Search
// ===============================

const searchInput =
document.getElementById(
    "searchInput"
);

if(searchInput){

searchInput.addEventListener(
"keyup",

function(){

const value =
this.value.toLowerCase();

const filtered =
products.filter(item=>

item.name
.toLowerCase()
.includes(value)

);

renderProducts(filtered);

});

}

// ===============================
// Filter Buttons
// ===============================

const buttons =
document.querySelectorAll(
".filterBtn"
);

buttons.forEach(btn=>{

btn.addEventListener(
"click",

function(){

buttons.forEach(
b=>b.classList.remove(
"active"
)
);

this.classList.add(
"active"
);

const type =
this.dataset.category;

if(type==="all"){

renderProducts(products);

}

else{

const filtered =
products.filter(

item=>

item.category===type

);

renderProducts(filtered);

}

});

});

// ===============================
// View Product
// ===============================

function viewProduct(id){

localStorage.setItem(
"selectedProduct",
id
);

window.location=
"product.html";

}

// ===============================
// Add To Cart
// ===============================

function addToCart(id){

let cart =
JSON.parse(
localStorage.getItem(
"cart"
)
) || [];

const item =
products.find(
p=>p.id===id
);

const exist =
cart.find(
p=>p.id===id
);

if(exist){

exist.quantity++;

}

else{

item.quantity=1;

cart.push(item);

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
// Cart Count
// ===============================

function updateCartCount(){

const badge =
document.getElementById(
"cartCount"
);

if(!badge) return;

let cart =
JSON.parse(
localStorage.getItem(
"cart"
)
) || [];

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

badge.innerText=total;

}

updateCartCount();

// ===============================
// Sort Products
// ===============================

const sortSelect =
document.getElementById(
"sortProducts"
);

if(sortSelect){

sortSelect.addEventListener(

"change",

function(){

let arr=[...products];

if(this.value==="low"){

arr.sort(
(a,b)=>a.price-b.price
);

}

if(this.value==="high"){

arr.sort(
(a,b)=>b.price-a.price
);

}

if(this.value==="rating"){

arr.sort(
(a,b)=>b.rating-a.rating
);

}

renderProducts(arr);

}

);

}

// ===============================
// Wishlist
// ===============================

function addWishlist(id){

let wishlist=

JSON.parse(

localStorage.getItem(

"wishlist"

)

)||[];

const item=

products.find(

p=>p.id===id

);

const exist=

wishlist.find(

p=>p.id===id

);

if(!exist){

wishlist.push(item);

}

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

alert(

"Added To Wishlist"

);

}

// ===============================
// Export
// ===============================

window.addToCart=addToCart;
window.viewProduct=viewProduct;
window.addWishlist=addWishlist;