const packageContainer  = document.querySelector('.package');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnlogin');
const iconClose = document.querySelector('.icon_close');

registerlink.addEventListener("click",()=>{
    packageContainer.classList.add('active');
});
loginlink.addEventListener("click",()=>{
    packageContainer.classList.remove('active');
});
btnPopup.addEventListener("click",()=>{
    packageContainer.classList.add('active-popup');
});
iconClose.addEventListener("click",()=>{
    packageContainer.classList.remove('active-popup');
});

function validatePassword(password) {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
}


function saveData() {
    const email = document.getElementById("e-mail").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("pass-word").value;
    const tikMark = document.getElementById("tik-mark").checked;

    var user_records = JSON.parse(localStorage.getItem("users")) || [];
    
    if(email === "" || name === "" || password === "" || !tikMark) {
        alert("Please fill all fields and agree to the terms & conditions.");
    } else if (user_records.some((v) => v.email === email)) {
        alert("You are already registered with this email id.");
    } else if(!validatePassword(password)){
        alert("Please Enter Valid Password \n\n \t Minimum eight characters \n \t ~ At least one uppercase letter \n \t ~ At least one lowercase letter \n \t ~ At least one digit (number) \n \t ~ At least one special character (defined by [@$!%*?&])");
    } else {
            user_records.push({
                email: email,
                name: name,
                password: password
            });

            localStorage.setItem("users", JSON.stringify(user_records));
            alert("Registration successful!");
    } 
}

// Example usage:
// const passwordToValidate = "SecureP@ssword1";
// if (validatePassword(passwordToValidate)) {
//     console.log("Password is valid.");
// } else {
//     console.log("Password is invalid.");
// }

