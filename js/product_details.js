let cartItemObjs;
onload();

function onload() {
    const eachProductId = getProductIdFromURL();
    if (eachProductId) {
        loadProductById(eachProductId);
        displayProdonDetailsPage();
    }
}

// Load specific product into cartItemObjs
function loadProductById(eachProductId) {
    cartItemObjs = [];
    for (let i = 0; i < allProduct.length; i++) {
        if (allProduct[i].prodID == eachProductId) {
            cartItemObjs.push(allProduct[i]);
        }
    }
}

// Adding the Product by Clicking on Buy Now Button
function buyNow(prodID) {
    // Check if the product is already in the cart
    if (productonCart.includes(prodID)) {
        alert("Product is already in the cart!");
        window.location.href = 'checkout.html';
    } else {
        addtoCart(prodID);
        // Redirect to checkout
        window.location.href = 'checkout.html';
    }
}

//Storing Each Product ID
function loadCartItemObjs(){
    cartItemObjs = productonCart.map(itemId => {
        for (let i = 0; i < allProduct.length; i++) {
            if (itemId == allProduct[i].prodID) {
                return allProduct[i];
            }
        }
    }) ;
};

//Display Product Details on Page
function displayProdonDetailsPage(){
    let product = cartItemObjs[0];
    if (!product) return;

    let totalPrice = product.price.originalPrice;
    let totalDiscount=  product.price.originalPrice - product.price.currentPrice;
    let netPayment = totalPrice - totalDiscount;

    let productDetails = document.querySelector('.prod_details_sec .row');
    printProdDetails = '';

    printProdDetails += `<div class="col-md-6 mb-4 mb-md-0">
        <div class="img_sec">
            <div class="main_img mb-0">
                <img src="${product.prodImg}" alt="" class="mx-auto">
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="content_sec">
            <h2 class="text_dark mb-4"><strong>${product.prodTitle}</strong></h2>
            <div class="review_sec d-flex align-items-center"><img src="${product.prodStar}" alt=""></div>
            <p class="cmn_para my-4">${product.prodDescription || 'No Description Available!'}</p>
           <p class="price_text text_dark"><strong>Price: $${product.price.currentPrice.toFixed(2)}</strong> <span class="text-decoration-line-through ms-3">$${product.price.originalPrice.toFixed(2)}</span></p>
            <div class="cta_sec">                
                <a href="javascript:void(0);" onclick="buyNow(${product.prodID})" class="cta_btn w-100 text-center">Buy Now</a>
            </div>
        </div>
    </div>`;
    productDetails.innerHTML = printProdDetails;
    console.log(allProduct[0]);
};