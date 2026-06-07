/* ==========================================
   Grow With Us - app.js
   Global Website Functionality
========================================== */

// ===============================
// Initialize Local Storage
// ===============================

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}

if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
}

if (!localStorage.getItem("wishlist")) {
    localStorage.setItem("wishlist", JSON.stringify([]));
}

// ===============================
// Current User
// ===============================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

// ===============================
// Navbar Cart Badge
// ===============================

function updateCartBadge() {

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity || 1;

    });

    badge.innerText = total;

}

updateCartBadge();

// ===============================
// Navbar User Name
// ===============================

function loadNavbarUser() {

    const userBox =
        document.getElementById("navbarUser");

    if (!userBox) return;

    if (currentUser) {

        userBox.innerHTML = `
            👋 ${currentUser.name}
        `;

    }

    else {

        userBox.innerHTML = `
            <a href="login.html">
                Login
            </a>
        `;

    }

}

loadNavbarUser();

// ===============================
// Search Products
// ===============================

const globalSearch =
document.getElementById(
    "globalSearch"
);

if (globalSearch) {

    globalSearch.addEventListener(

        "keyup",

        function () {

            const value =
            this.value
            .toLowerCase();

            const cards =
            document.querySelectorAll(
                ".productCard"
            );

            cards.forEach(card => {

                const title =
                card
                .querySelector("h3")
                .innerText
                .toLowerCase();

                if (
                    title.includes(value)
                ) {

                    card.style.display =
                    "block";

                }

                else {

                    card.style.display =
                    "none";

                }

            });

        }

    );

}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    alert(
        "Logged Out Successfully"
    );

    window.location =
    "login.html";

}

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}

// ===============================
// Scroll To Top Button
// ===============================

const scrollBtn =
document.getElementById(
    "scrollTop"
);

if (scrollBtn) {

window.addEventListener(

"scroll",

function(){

if(

window.scrollY>300

){

scrollBtn.style.display=
"block";

}

else{

scrollBtn.style.display=
"none";

}

}

);

scrollBtn.addEventListener(

"click",

function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

);

}

// ===============================
// Newsletter Subscribe
// ===============================

const subscribeBtn =
document.getElementById(
    "subscribeBtn"
);

if(subscribeBtn){

subscribeBtn.addEventListener(

"click",

function(){

const email=

document.getElementById(
"subscribeEmail"
);

if(

email.value===""

){

alert(

"Please Enter Email"

);

return;

}

alert(

"Subscribed Successfully!"

);

email.value="";

}

);

}

// ===============================
// Hero Shop Now Button
// ===============================

const shopBtn =
document.getElementById(
"shopNow"
);

if(shopBtn){

shopBtn.addEventListener(

"click",

function(){

window.location=
"products.html";

}

);

}

// ===============================
// Protected Pages
// ===============================

const protectedPages=[

"dashboard.html",

"profile.html",

"orders.html",

"checkout.html"

];

const currentPage=

window.location
.pathname
.split("/")
.pop();

if(

protectedPages.includes(
currentPage
)

&&

!currentUser

){

alert(

"Please Login First"

);

window.location=
"login.html";

}

// ===============================
// Welcome Message
// ===============================

const welcome=

document.getElementById(
"welcomeText"
);

if(

welcome

&&

currentUser

){

welcome.innerText=

`Welcome ${currentUser.name}`;

}

// ===============================
// Footer Year
// ===============================

const year=

document.getElementById(
"year"
);

if(year){

year.innerText=

new Date()
.getFullYear();

}

// ===============================
// Dark Mode
// ===============================

const darkBtn=

document.getElementById(
"darkModeBtn"
);

if(darkBtn){

if(

localStorage.getItem(
"theme"
)==="dark"

){

document.body.classList.add(
"dark"
);

}

darkBtn.onclick=()=>{

document.body.classList.toggle(
"dark"
);

if(

document.body.classList.contains(
"dark"
)

){

localStorage.setItem(
"theme",
"dark"
);

}

else{

localStorage.setItem(
"theme",
"light"
);

}

};

}

// ===============================
// Loader
// ===============================

window.addEventListener(

"load",

function(){

const loader=

document.getElementById(
"loader"
);

if(loader){

loader.style.display=
"none";

}

}

);

// ===============================
// Online / Offline Status
// ===============================

window.addEventListener(

"offline",

function(){

alert(

"You are offline."

);

}

);

window.addEventListener(

"online",

function(){

alert(

"Internet Connected."

);

}

);

// ===============================
// Exports
// ===============================

window.logout = logout;
window.updateCartBadge = updateCartBadge;