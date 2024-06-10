console.log("connected");

//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let addCart = document.querySelector("#add-cart"); 
var title = document.querySelector(".product-title"); //added for checking
var price = document.querySelector(".price");
var prodcutImg = document.querySelector(".prodcut-img");
let wishHeart = document.querySelectorAll(".wishlist");

//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};


//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

//making function
function ready() {
    //removing items from cart
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons)
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
//Buy button Work
document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}

//Buy button 
                function buyButtonClicked(){
                    // alert('Your order is placed')
                    var cartContent =document.getElementsByClassName('cart-content')[0]
                    while(cartContent.hasChildNodes()){
                    cartContent.removeChild(cartContent.firstChild);
                    }
                updatetotal();
                // Redirect to the new page using an absolute URL path
                window.location.href = '/payment';
                }
  

//removing items from cart 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//Add to cart
function addCartClicked(event){
    var button= event.target
    var shopProducts = button.parentElement
    var title =shopProducts.getElementsByClassName('product-title')[0].innerText;
     var price =
       shopProducts.getElementsByClassName("price")[0].innerText;
        var productImg =
          shopProducts.getElementsByClassName("product-img")[0].src;
         addProductToCart(title,price,productImg);
         updatetotal();
  
  }

function addProductToCart(title, price, prodcutImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");    
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title.toUpperCase()) {
            console.log("Found a duplicate item: " + title);
            alert("You  have already added this item to cart");
            return;
        }
    }
    var cartBoxContent = 
                          `<img src="${prodcutImg}" alt="" class="image">
                          <div class="detail-box">
                            <h3 class="cart-product-title">${title}</h3>
                            <div class="price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                          </div>
                          <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    // console.log("entered");
}

//quantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// addCart.addEventListener("click", addCartClicked);
document.addEventListener("DOMContentLoaded", function() {
    var addCart = document.getElementById("addCart");
    if (addCart) {
        addCart.addEventListener("click", addCartClicked);
    }
});


    //update total
    function updatetotal() {
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace("Rs", " "));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
           //if price contains some cent value
            total = Math.round(total * 100) / 100;

            document.getElementsByClassName('total-price')[0].innerText = "Rs " + total;
            console.log(total);
            return total;
    }   

    wishHeart.forEach(wishHeart => {
        wishHeart.addEventListener("click", (event) => {
            alert("Item added to wishlist.");
        });
    });


    
    
    
    



