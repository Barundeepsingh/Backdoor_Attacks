let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let forgotPassword = document.querySelector('.form-box p');

signInBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Log In";
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
    
    // Show the Forgot Password element
    forgotPassword.style.display = "block";
}

signUpBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signUpBtn.classList.remove("disable");
    signInBtn.classList.add("disable");
    
    // Hide the Forgot Password element
    forgotPassword.style.display = "none";
}
