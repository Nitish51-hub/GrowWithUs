/* ==========================================
   Grow With Us - dashboard.js
   Dashboard | Orders | Profile Management
========================================== */

// ===============================
// Current User
// ===============================

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(!currentUser){

window.location =
"login.html";

}

// ===============================
// Load User Information
// ===============================

function loadProfile(){

const userName =
document.getElementById(
"userName"
);

const userEmail =
document.getElementById(
"userEmail"
);

const userPhone =
document.getElementById(
"userPhone"
);

const welcome =
document.getElementById(
"welcomeText"
);

if(userName){

userName.innerText =
currentUser.name;

}

if(userEmail){

userEmail.innerText =
currentUser.email;

}

if(userPhone){

userPhone.innerText =
currentUser.phone;

}

if(welcome){

welcome.innerText =
"Welcome, " +
currentUser.name;

}

}

loadProfile();

// ===============================
// Dashboard Statistics
// ===============================

function loadStats(){

const orders =
currentUser.orders || [];

const wishlist =
currentUser.wishlist || [];

const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const totalOrders =
document.getElementById(
"totalOrders"
);

const totalWishlist =
document.getElementById(
"totalWishlist"
);

const totalCart =
document.getElementById(
"totalCart"
);

const totalSpent =
document.getElementById(
"totalSpent"
);

if(totalOrders){

totalOrders.innerText =
orders.length;

}

if(totalWishlist){

totalWishlist.innerText =
wishlist.length;

}

if(totalCart){

totalCart.innerText =
cart.length;

}

let spent = 0;

orders.forEach(order=>{

order.items.forEach(item=>{

spent +=
item.price *
item.quantity;

});

});

if(totalSpent){

totalSpent.innerText =
"₹" + spent;

}

}

loadStats();

// ===============================
// Load Orders
// ===============================

function loadOrders(){

const container =
document.getElementById(
"ordersContainer"
);

if(!container){

return;

}

const orders =
currentUser.orders || [];

container.innerHTML = "";

if(orders.length===0){

container.innerHTML =

"<h2>No Orders Yet</h2>";

return;

}

orders.forEach(order=>{

let products = "";

order.items.forEach(item=>{

products +=

`

<p>

${item.name}

x

${item.quantity}

</p>

`;

});

container.innerHTML +=

`

<div class="orderCard">

<h3>

Order ID :
${order.id}

</h3>

<p>

${order.date}

</p>

<p>

Status :
<b>

${order.status}

</b>

</p>

${products}

<hr>

</div>

`;

});

}

loadOrders();

// ===============================
// Edit Profile
// ===============================

const saveProfile =
document.getElementById(
"saveProfile"
);

if(saveProfile){

saveProfile.addEventListener(

"click",

function(){

const name =
document.getElementById(
"name"
).value;

const phone =
document.getElementById(
"phone"
).value;

currentUser.name =
name;

currentUser.phone =
phone;

localStorage.setItem(

"currentUser",

JSON.stringify(
currentUser
)

);

// Update user list

let users =
JSON.parse(
localStorage.getItem(
"users"
)
) || [];

users =
users.map(user=>{

if(

user.email===

currentUser.email

){

return currentUser;

}

return user;

});

localStorage.setItem(

"users",

JSON.stringify(users)

);

alert(

"Profile Updated"

);

location.reload();

}

);

}

// ===============================
// Logout
// ===============================

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

logoutBtn.onclick =

function(){

localStorage.removeItem(
"currentUser"
);

window.location =
"login.html";

};

}

// ===============================
// Wishlist
// ===============================

function loadWishlist(){

const container =
document.getElementById(
"wishlistContainer"
);

if(!container){

return;

}

const wishlist =
currentUser.wishlist || [];

container.innerHTML="";

if(wishlist.length===0){

container.innerHTML=

"<h3>No Wishlist Products</h3>";

return;

}

wishlist.forEach(item=>{

container.innerHTML +=

`

<div class="wishlistCard">

<img src="${item.image}">

<h3>

${item.name}

</h3>

<p>

₹${item.price}

</p>

</div>

`;

});

}

loadWishlist();

// ===============================
// Recent Orders
// ===============================

function recentOrders(){

const box =
document.getElementById(
"recentOrders"
);

if(!box){

return;

}

const orders =
currentUser.orders || [];

box.innerHTML="";

orders.slice(-3).reverse().forEach(order=>{

box.innerHTML +=

`

<p>

${order.id}

-

${order.status}

</p>

`;

});

}

recentOrders();

// ===============================
// Delete Account
// ===============================

const deleteBtn =
document.getElementById(
"deleteAccount"
);

if(deleteBtn){

deleteBtn.onclick =

function(){

const check =

confirm(

"Delete Account?"

);

if(!check){

return;

}

let users =
JSON.parse(

localStorage.getItem(

"users"

)

);

users =
users.filter(user=>

user.email

!==

currentUser.email

);

localStorage.setItem(

"users",

JSON.stringify(users)

);

localStorage.removeItem(
"currentUser"
);

alert(

"Account Deleted"

);

window.location =
"index.html";

};

}

// ===============================
// Change Profile Image
// ===============================

const profileImage =
document.getElementById(
"profileImage"
);

const imageInput =
document.getElementById(
"profileUpload"
);

if(imageInput){

imageInput.addEventListener(

"change",

function(){

const file =
this.files[0];

if(!file){

return;

}

const reader =
new FileReader();

reader.onload =
function(e){

profileImage.src =
e.target.result;

currentUser.image =
e.target.result;

localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);

};

reader.readAsDataURL(
file
);

}

);

}

// ===============================
// Load Profile Image
// ===============================

if(

profileImage

&&

currentUser.image

){

profileImage.src =

currentUser.image;

}

// ===============================
// Dark Mode
// ===============================

const darkMode =
document.getElementById(
"darkModeBtn"
);

if(darkMode){

darkMode.onclick =

function(){

document.body.classList.toggle(
"dark"
);

};

}

// ===============================
// Dashboard Clock
// ===============================

const clock =
document.getElementById(
"clock"
);

if(clock){

setInterval(

function(){

clock.innerText =

new Date()
.toLocaleTimeString();

},

1000

);

}

// ===============================
// Motivational Quote
// ===============================

const quote =
document.getElementById(
"quote"
);

const quotes=[

"Train Hard Stay Strong",

"Every Rep Counts",

"Push Beyond Limits",

"Discipline Beats Motivation",

"No Pain No Gain",

"Success Starts Today"

];

if(quote){

quote.innerText=

quotes[
Math.floor(
Math.random()*
quotes.length
)
];

}

// ===============================
// Export
// ===============================

window.loadOrders =
loadOrders;

window.loadProfile =
loadProfile;

window.loadStats =
loadStats;