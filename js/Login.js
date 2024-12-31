let email = document.querySelector("#email")
let password = document.querySelector("#pwd")
let btn = document.querySelector("#btn")

let getemail = localStorage.getItem("email")
let getPassword =localStorage.getItem("password")


btn.addEventListener("click", function(e) {
e.preventDefault()
if(email.value==="" || password.value===""){
    alert("please fill data")
}else{
if(email.value.trim()===getemail.trim()&&getemail && password.value.trim()===getPassword.trim()&&getPassword){
    setTimeout ( () => {
        window.location = "index.html"
    } , 1500)
}
else{
    alert("fulse data")
}}




})