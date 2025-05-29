let cartItemObjs;
onload();

function onload() {
    loadCartItemObjs();
    displayCheckoutItems();
    displayCheckoutPrice();
};

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

//Display the Added Products
function displayCheckoutItems(){
    let checkoutProdContainer = document.querySelector('.checkout_sec .right_sec .cart_prod');
    let printHtmlonCheckoutPage = '';
    cartItemObjs.forEach(productonCart => {
        printHtmlonCheckoutPage += generateCheckoutItemHTML(productonCart);
    });
    checkoutProdContainer.innerHTML = printHtmlonCheckoutPage;
};
//Items Remove From Checkout Page
function removeCheckoutItem(prodID) {
    let prodToRemove = productonCart.indexOf(prodID);
    if (prodToRemove !== -1) {
        productonCart.splice(prodToRemove, 1);
    }
    localStorage.setItem('productonCart', JSON.stringify(productonCart));
    loadCartItemObjs();
    displayCheckoutItems();
    displayCheckoutPrice();
}
//Cart Products on Table
function generateCheckoutItemHTML(allProduct) {
    return `
        <div class="img_n_title d-flex justify-content-between align-items-center m-0 mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="img_box d-flex justify-content-between align-items-center bg-white">
                    <img src="${allProduct.prodImg}" alt="" class="mx-auto">
                </div>
                <h4 class="text_dark m-0 ms-3">${allProduct.prodTitle}</h4>
            </div>
            <p class="text_dark m-0">$${allProduct.price.currentPrice.toFixed(2)}</p>
        </div>`;
}

//Display the Price
function displayCheckoutPrice() {
    let totalItems = cartItemObjs.length;
    let totalPrice = 0;
    let totalDiscount = 0;
    let netPayment = 0;

    cartItemObjs.forEach(allProduct => {
        totalPrice += allProduct.price.originalPrice;
        totalDiscount += allProduct.price.originalPrice - allProduct.price.currentPrice;
        netPayment = totalPrice - totalDiscount;
    });

    let mainProductWrap = document.querySelector('.checkout_sec .right_sec .cart_price');
    let printCheckoutPriceonPage = '';

        printCheckoutPriceonPage += `
            <div class="d-flex justify-content-between align-items-center">
                <p class="text_dark m-0">Subtotal</p>
                <p class="text_dark m-0" id="subtotal">$${totalPrice.toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center my-3">
                <p class="text_dark m-0">Discount</p>
                <p class="text-success m-0" id="discount">-$${totalDiscount.toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center my-3">
                <p class="text_dark m-0">Shipping</p>
                <p class="text-success m-0">FREE</p>
            </div>
            <hr>
            <div class="total_price d-flex justify-content-between align-items-center">
                <p class="text_dark m-0 fw-bold">Net Payable</p>
                <p class="text_dark m-0 fw-bold" id="netpay">$${netPayment.toFixed(2)}</p>
            </div>`;
    mainProductWrap.innerHTML = printCheckoutPriceonPage;
};
