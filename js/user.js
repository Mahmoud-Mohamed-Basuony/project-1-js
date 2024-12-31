// let usernameDiv = document.querySelector(".user-name")

// let links = document.querySelector(".links")
// let userinfo = document.querySelector(".user-info")

// if (localStorage.getItem("fristname")) {
//     links.remove();
//     userinfo.style.display = "flex";
//     usernameDiv.style.display = "flex";
//     usernameDiv.innerHTML = "Wellcom   " + localStorage.getItem("fristname")
// }


let logout = document.querySelector("#logout")
logout.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500)

})