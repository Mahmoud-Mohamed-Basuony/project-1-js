let fristname = document.querySelector("#First-name")
let lastname = document.querySelector(".Last-name")
let email = document.querySelector("#email")
let password = document.querySelector("#pwd")
let btn = document.querySelector("#btn")

btn.addEventListener("click",function(e) {
    e.preventDefault()
if(fristname.value==="" || email.value==="" || password.value==="" ||lastname.value===""){
    alert("please fill data")}
    else{
        localStorage.setItem("fristname" , fristname.value)
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , password.value)
        localStorage.setItem("lastname" , lastname.value)

        setTimeout ( () => {
            window.location = "Login.html"
        } , 1500)
    }

})


