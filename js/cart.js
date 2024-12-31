
let userinfo = document.querySelector(".user-info")

if (localStorage.getItem("fristname")) {

    userinfo.style.display = "flex";

}
// //////////////////////////////////////////////////////////////

let ProductsInCart = localStorage.getItem("ProductsInCart") // المتغير الماسك المنتجات الي اخترتها
let allProducts = document.querySelector(".prodacts") // المكان الي هعرض فيه المنتجات 

if (ProductsInCart) {
    let item = JSON.parse(ProductsInCart);
    drawCartProducts(item);
} 

function drawCartProducts(products) {
    let y = products.map((item) => {
        let quantity = localStorage.getItem(`quantity_${item.id}`);
        quantity = quantity ? JSON.parse(quantity) : 1;
        return `
        <div class="card card2 mb-3  rounded-5 bg-tertiary  col-xl-6  col-lg-6  col-md-12  col-sm-12  col-12 " data-id="${item.id}"  style="max-width: 550px;   ">
                <div class="row g-0 my-auto">
                  <div class="col-md-4 img-carde  mx-auto  ">
                    <img src="${item.imageUrl}" class="img-fluid rounded-start " alt="...">
                  </div>
                  <div class="col-md-8 col ">
                    <div class="card-body">
                      <h5 class="card-title">product : ${item.tittle}</h5>
                      <h5 class="card-text">category : ${item.category}</h5>
                      <h5 class="card-text">price : ${item.price}$</h5>
                     <div class="jj">
                      <div class="num">${quantity}</div>
                      <i class="fas fa-plus text-black text-end icon2 icon4" onClick="increaseQuantity(${item.id})"></i>
                      <i class="fas fa-minus text-danger  icon3 icon4 me-5" onClick="decreaseQuantity(${item.id})"></i>
                      <button  class="btn btn-danger  " onClick="removeFromCart(${item.id})">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        `

    })
    allProducts.innerHTML = y.join("");
}


let Favourites = localStorage.getItem("Favourites") // المتغير الماسك المنتجات الي اخترتها
let FavouritesProducts = document.querySelector(".Favourites-container") // المكان الي هعرض فيه المنتجات 

if (Favourites) {
    let item = JSON.parse(Favourites);
    drawFavourites(item);
}

function drawFavourites(products) {
    let y = products.map((item) => {
        return `
       <div class="card card3 rounded-5" style="width: 320px">
            <img
              class="card-img-top w-50 h-50 mx-auto mt-4"
              src="${item.imageUrl}"
              alt="Card image"
            />
            <div class="card-body ">
              <h5 class="card-title">product : ${item.tittle}</h5>

              <h5 class="card-text d-inline">category : ${item.category}</h5>
              <i class="fas fa-heart favorit text-end " onClick="removeFavourites(${item.id})"></i>
            </div>
          </div>
        `

    })
    FavouritesProducts.innerHTML = y.join("");
}


function removeFavourites(id) {
    let Favourites = JSON.parse(localStorage.getItem("Favourites"));
    Favourites = Favourites.filter(item => item.id !== id);
    localStorage.setItem("Favourites", JSON.stringify(Favourites))
    drawFavourites(Favourites)
}





// //////////////////////////////////////////////////////////////  حساب السعر الكلي //////////////////////////////////////////////////////
let price = document.querySelector(".pri")
let totalprice = localStorage.getItem("price")
totalprice = +(totalprice)
price.innerHTML = +(totalprice) + `$`
// //////////////////////////////////////////////////////////////  حذف المنتجات //////////////////////////////////////////////////////
function save(item) {
    localStorage.setItem("ProductsInCart", JSON.stringify(item));
}

function removeFromCart(id) {
    let products = JSON.parse(localStorage.getItem("ProductsInCart"));
    // //////////////////////////////////////////////////////////////
    let e = products.find((x) => x.id == id)
    let priceItem = e.price
    let quantity = localStorage.getItem(`quantity_${id}`);
    quantity = quantity ? JSON.parse(quantity) : 1;
    let totalPriceitem = +(quantity * priceItem)
    let total = localStorage.getItem("price") - totalPriceitem
    localStorage.setItem("price", total)
    price.innerHTML = +(total) + `$`
    // ///////////////////////////////////////////////////////////////
    products = products.filter(item => item.id !== id);
    save(products);
    drawCartProducts(products);
}


// //////////////////////////////////////////////////////////////  زيادة ونقصان الكمية //////////////////////////////////////////////////////

function increaseQuantity(id) {
    let item = JSON.parse(ProductsInCart);
    let choosenItem = item.find((item) => item.id === id);

    let productDiv = document.querySelector(`.card[data-id='${id}']`);
    if (productDiv) {
        let numSpan = productDiv.querySelector(".num");
        let currentQuantity = +(numSpan.textContent);
        numSpan.textContent = currentQuantity + 1;

        totalprice += parseInt(choosenItem.price)
        localStorage.setItem("price", JSON.stringify(totalprice));
        price.innerHTML = +(totalprice)
    }
}


function decreaseQuantity(id) {
    let item = JSON.parse(ProductsInCart);
    let choosenItem = item.find((item) => item.id === id);


    let productDiv = document.querySelector(`.card[data-id='${id}']`);
    if (productDiv) {
        let numSpan = productDiv.querySelector(".num");
        let currentQuantity = +(numSpan.textContent);

        if (currentQuantity > 1) {
            numSpan.textContent = currentQuantity - 1;

            totalprice -= parseInt(choosenItem.price)
            localStorage.setItem("price", JSON.stringify(totalprice));
            price.innerHTML = +(totalprice)
            localStorage.setItem(`quantity_${id}`, JSON.stringify(currentQuantity - 1));
        }
        else {
            productDiv.remove();
            totalprice -= parseInt(choosenItem.price)
            localStorage.setItem("price", JSON.stringify(totalprice));
            localStorage.removeItem(`quantity_${id}`);
            price.innerHTML = +(totalprice)
        }
    }
}
// ///////////////////////////////////////////////////////    prices //////////////////////////////////////////////////////

