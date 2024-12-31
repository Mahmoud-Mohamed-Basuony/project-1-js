let usernameDiv = document.querySelector(".user-name")

let links = document.querySelector(".links")
let userinfo = document.querySelector(".user-info")

if (localStorage.getItem("fristname")) {
    links.remove();
    userinfo.style.display = "flex";
    usernameDiv.style.display = "flex";
    usernameDiv.innerHTML = "Wellcom   " + localStorage.getItem("fristname")
}


let logout = document.querySelector("#logout")
logout.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500)

})

// ///////////////////////////////////////////////////////////

let allProducts = document.querySelector(".prodacts")

let product = [{
    id: 1,
    tittle: "T-shirt",
    price: "90",
    category: "fashion",
    imageUrl: "images/product1.jpg"
},
{
    id: 2,
    tittle: "earpods",
    price: "150",
    category: "phone accessories",
    imageUrl: "images/product2.jpg"
},
{
    id: 3,
    tittle: "Jacket",
    price: "120",
    category: "fashion",
    imageUrl: "images/product3.jpg"
},
{
    id: 4,
    tittle: "Adidas bottle",
    price: "50",
    category: "sport",
    imageUrl: "images/product4.jpg"
},
{
    id: 5,
    tittle: "iphone",
    price: "200",
    category: "phone",
    imageUrl: "images/IPhone-13.jpg"
},
{
    id: 6,
    tittle: "Glasses",
    price: "60",
    category: "Men accessories",
    imageUrl: "images/product5.jpg"
},
{
    id: 7,
    tittle: "Cap",
    price: "80",
    category: "Men accessories",
    imageUrl: "images/product6.jpg"
},
{
    id: 8,
    tittle: "Bag adidas",
    price: "120",
    category: "Bags",
    imageUrl: "images/product7.jpg"
},
{
    id: 9,
    tittle: "Shoes adidas",
    price: "130",
    category: "Sport",
    imageUrl: "images/product8.jpg"
}

]
function drawItems(product) {
    let y = product.map((item) => {
        return `
  <div class="card card1  col-xl-4  col-lg-4  col-md-4  col-sm-12  col-12 "  >
    <img class="card-img-top" src="${item.imageUrl}" alt="Card image" >
    <div class="card-body">
      <h5 >product :${item.tittle} </h5>
      <h5>price :${item.price}$ </h5>
      <h5>category : ${item.category}</h5>
      <div class="row">
      <button class="btn btn-primary  " onClick="addToCart(${item.id})">See Profile</button>
      <i class="fas fa-heart fav   " data-id="${item.id}" onClick="addToFavourites(${item.id})"></i></div>
    </div>
  </div>
        `
    })
    allProducts.innerHTML = y.join("");

}
drawItems(product)


// let addedItem = [];

let badge = document.querySelector(".badge")
let cartProductDiv = document.querySelector(".carts_products div")



let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];

if (addedItem) {
    addedItem.map(item => {
        let quantity = localStorage.getItem(`quantity_${item.id}`);
        quantity = quantity ? JSON.parse(quantity) : 1;
        cartProductDiv.innerHTML += `<div class="product-pay "  data-id="${item.id}" price="${item.price}">
        <span class="tit text-start">${item.tittle}</span>
        <span class="num">${quantity}</span>
        <i class="fas fa-plus text-black text-end icon2" onClick="increaseQuantity(${item.id})"></i>
        <i class="fas fa-minus text-danger  icon3 " onClick="decreaseQuantity(${item.id})"></i>
      </div>`;
    })
    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}





var totalPrice = 0

function addToCart(id) {
    if (localStorage.getItem("fristname")) {
        let choosenItem = product.find((item) => item.id === id);
        cartProductDiv.innerHTML += `<div class="product-pay"  data-id="${choosenItem.id}" price="${choosenItem.price}">
                      <span class="tit text-start">${choosenItem.tittle}</span>
                      <span class="num">1</span>
                      <i class="fas fa-plus text-black text-end icon2" onClick="increaseQuantity(${choosenItem.id})"></i>
                      <i class="fas fa-minus text-danger  icon3 " onClick="decreaseQuantity(${choosenItem.id})"></i>
                    </div>`;
        addedItem = [...addedItem, choosenItem]
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem))
        let cartProductDivnum = document.querySelectorAll(".carts_products div .product-pay")
        badge.innerHTML = cartProductDivnum.length;
        totalPrice += +(choosenItem.price)
        localStorage.setItem("price", JSON.stringify(totalPrice));
    } else {
        window.location = "login.html"
    }
}


function increaseQuantity(id) {
    let choosenItem = product.find((item) => item.id === id);
    let productDiv = document.querySelector(`.product-pay[data-id='${id}']`);
    if (productDiv) {
        let numSpan = productDiv.querySelector(".num");
        let currentQuantity = +(numSpan.textContent);
        numSpan.textContent = currentQuantity + 1;
        totalPrice += +(choosenItem.price)
        localStorage.setItem("price", JSON.stringify(totalPrice));
        localStorage.setItem(`quantity_${id}`, JSON.stringify(currentQuantity + 1));
    }
}


function decreaseQuantity(id) {
    let choosenItem = product.find((item) => item.id === id);
    let productDiv = document.querySelector(`.product-pay[data-id='${id}']`);
    if (productDiv) {
        let numSpan = productDiv.querySelector(".num");
        let currentQuantity = +(numSpan.textContent);
        console.log(currentQuantity)
        if (currentQuantity > 1) {
            numSpan.textContent = currentQuantity - 1;
            totalPrice -= +(choosenItem.price)
            localStorage.setItem("price", JSON.stringify(totalPrice));
            localStorage.setItem(`quantity_${id}`, JSON.stringify(currentQuantity - 1));
        }
        else {
            productDiv.remove();
            // //////////////////////////////////////////////////////
            let e = JSON.parse(localStorage.getItem("ProductsInCart"));
            addedItem = e.filter((item) => item.id !== id);
            localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
            badge.innerHTML = addedItem.length;
            // //////////////////////////////////////////////////////
            totalPrice -= +(choosenItem.price)
            localStorage.setItem("price", JSON.stringify(totalPrice));
            localStorage.removeItem(`quantity_${id}`);
        }
    }
}

let Favourites = [];

function addToFavourites(id) {
    let index = Favourites.findIndex((item) => item.id === id);
    if (index === -1) {
        let heartIcon = document.querySelector(`.fav[data-id='${id}']`);
        heartIcon.style.color = "red";
        let prod = product.find((item) => item.id === id);
        Favourites = [...Favourites, prod]
        localStorage.setItem("Favourites", JSON.stringify(Favourites))
    } else {
        let heartIcon = document.querySelector(`.fav[data-id='${id}']`);
        heartIcon.style.color = " #989797";
        Favourites = Favourites.filter((item) => item.id !== id);
        localStorage.setItem("Favourites", JSON.stringify(Favourites))
    }
}





// //////////////////////////////////////////////////////////////////////////////////    filter    /////////////////////////////////////////

const selector = document.querySelector(".selector")
const searchInput = document.querySelector(".input-search")
const prodacts = document.querySelectorAll(".prodacts")

// function search() {
//     if (selector.value == "category") {

//         function removeFromCart() {
//             let choosenItem = product.filter((item) => item.category == searchInput.value);
//             drawItems(choosenItem);
//         }

//         searchInput.addEventListener("input", removeFromCart)
//     }

//     else if(selector.value !== "category") {

//         function removeFromCart() {
//             let choosenItem = product.filter((item) => item.tittle == searchInput.value);
//             drawItems(choosenItem);
//         }

//         searchInput.addEventListener("input", removeFromCart)
//     }
//     else if(selector.value == "") {drawItems(product)}
// }
// selector.addEventListener("change", search)

function removeFromCart() {
    if (searchInput.value === "") {
        drawItems(product)
    }
    else if (selector.value == "category") {
        let choosenItem = product.filter((item) => item.category == searchInput.value);

        console.log(choosenItem)

        drawItems(choosenItem);
    }
    else if (selector.value !== "category") {
        let choosenItem = product.filter((item) => item.tittle == searchInput.value);

        console.log(choosenItem)

        drawItems(choosenItem);
    }

}

searchInput.addEventListener("input", removeFromCart)




// //////////////////////////////////////////////////////////////////
let shoppingCartIcon = document.querySelector(".dropdown")
let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)

function opencart() {
    if (cartProductDiv.innerHTML != "") {
        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none"
        } else {
            cartsProducts.style.display = "block";
        }
    }
}

// ////////////////////////////////////////////////////////////////////
// let numberOfProducts = document.querySelector(".num");
// let r = document.querySelectorAll(".product-pay")
// // let icon2 = document.querySelector(".icon2");
// // icon2.addEventListener("click", plus);
// function plus(ti) {
//     let choose = r.find((item) => item.tittle == ti );
//     console.log();
// } 