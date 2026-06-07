/* ==========================================
   Grow With Us - auth.js
   Login & Register System
   Uses localStorage
========================================== */

// ===============================
// Get Users
// ===============================

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

// ===============================
// Register
// ===============================

const registerForm =
document.getElementById(
"registerForm"
);

if(registerForm){

registerForm.addEventListener(

"submit",

function(e){

e.preventDefault();

const name =
document.getElementById(
"name"
).value.trim();

const email =
document.getElementById(
"email"
).value.trim();

const phone =
document.getElementById(
"phone"
).value.trim();

const password =
document.getElementById(
"password"
).value;

const confirm =
document.getElementById(
"confirmPassword"
).value;

if(
name==="" ||
email==="" ||
phone==="" ||
password===""
){

alert(
"Please fill all fields."
);

return;

}

if(password!==confirm){

alert(
"Passwords do not match."
);

return;

}

const exist =
users.find(
user=>user.email===email
);

if(exist){

alert(
"Email already registered."
);

return;

}

const newUser={

id:Date.now(),

name,

email,

phone,

password,

cart:[],

wishlist:[],

orders:[]

};

users.push(
newUser
);

localStorage.setItem(

"users",

JSON.stringify(users)

);

alert(
"Registration Successful!"
);

window.location=
"login.html";

});

}

// ===============================
// Login
// ===============================

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(

"submit",

function(e){

e.preventDefault();

const email =
document.getElementById(
"email"
).value.trim();

const password =
document.getElementById(
"password"
).value;

const user =
users.find(

u=>

u.email===email &&

u.password===password

);

if(!user){

alert(
"Invalid Email or Password"
);

return;

}

localStorage.setItem(

"currentUser",

JSON.stringify(user)

);

alert(
"Login Successful"
);

window.location=
"dashboard.html";

});

}

// ===============================
// Show Password
// ===============================

const togglePassword =
document.getElementById(
"togglePassword"
);

if(togglePassword){

togglePassword.addEventListener(

"click",

function(){

const passwordInput =
document.getElementById(
"password"
);

if(
passwordInput.type==="password"
){

passwordInput.type="text";

this.classList.remove(
"fa-eye"
);

this.classList.add(
"fa-eye-slash"
);

}

else{

passwordInput.type="password";

this.classList.remove(
"fa-eye-slash"
);

this.classList.add(
"fa-eye"
);

}

});

}

// ===============================
// Show Confirm Password
// ===============================

const toggleConfirm =
document.getElementById(
"toggleConfirmPassword"
);

if(toggleConfirm){

toggleConfirm.addEventListener(

"click",

function(){

const confirmInput =
document.getElementById(
"confirmPassword"
);

if(
confirmInput.type==="password"
){

confirmInput.type="text";

this.classList.remove(
"fa-eye"
);

this.classList.add(
"fa-eye-slash"
);

}

else{

confirmInput.type="password";

this.classList.remove(
"fa-eye-slash"
);

this.classList.add(
"fa-eye"
);

}

});

}

// ===============================
// Forgot Password
// ===============================

const forgotBtn =
document.getElementById(
"forgotPassword"
);

if(forgotBtn){

forgotBtn.addEventListener(

"click",

function(){

const email =
prompt(
"Enter your registered email:"
);

if(!email){

return;

}

const user =
users.find(

u=>u.email===email

);

if(!user){

alert(
"Email not found."
);

return;

}

alert(

"Your Password : " +

user.password

);

});

}

// ===============================
// Logout
// ===============================

function logout(){

localStorage.removeItem(
"currentUser"
);

alert(
"Logged Out Successfully"
);

window.location=
"login.html";

}

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

logoutBtn.addEventListener(

"click",

logout

);

}

// ===============================
// Check Login
// ===============================

function checkLogin(){

const currentUser =
JSON.parse(

localStorage.getItem(

"currentUser"

)

);

if(!currentUser){

window.location=
"login.html";

}

}

// ===============================
// Auto Redirect
// ===============================

const currentPage =
window.location
.pathname
.split("/")
.pop();

if(

currentPage==="login.html"

&&

localStorage.getItem(
"currentUser"
)

){

window.location=
"dashboard.html";

}

// ===============================
// Remember Me
// ===============================

const remember =
document.getElementById(
"rememberMe"
);

if(remember){

const savedEmail =
localStorage.getItem(
"rememberEmail"
);

if(savedEmail){

document.getElementById(
"email"
).value=savedEmail;

remember.checked=true;

}

loginForm?.addEventListener(

"submit",

function(){

if(

remember.checked

){

localStorage.setItem(

"rememberEmail",

document.getElementById(
"email"
).value

);

}

else{

localStorage.removeItem(
"rememberEmail"
);

}

}

);

}

// ===============================
// Export
// ===============================

window.logout=logout;
window.checkLogin=checkLogin;