let cartItemObjs;
onload();

function onload(){
    loadCartItemObjs();
    displayCartItems();
    displayCartSummary();
    // displayCheckoutProdItems();
};
// Storing Each Product ID
function loadCartItemObjs(){
    console.log(productonCart)
    cartItemObjs = productonCart.map(itemId => {
        for (let i = 0; i < allProduct.length; i++) {
            if (itemId == allProduct[i].prodID) {
                return allProduct[i];
            }
        }
    }) ;
    console.log(cartItemObjs)
};

//Display Items
function displayCartItems(){
    let cartProdContainer = document.querySelector('.cart_sec .cart_table tbody');
    let printHtmlonCartPage = '';
    cartItemObjs.forEach(productonCart => {
        printHtmlonCartPage += generateCartItemHTML(productonCart);
    });
    cartProdContainer.innerHTML = printHtmlonCartPage;
};
//Items Remove From Cart
function removeCartItem(prodID) {
    let prodToRemove = productonCart.indexOf(prodID);
    if (prodToRemove !== -1) {
        productonCart.splice(prodToRemove, 1);
    }
    localStorage.setItem('productonCart', JSON.stringify(productonCart));
    loadCartItemObjs();
    displayCartItems();
    displayCartSummary();
    displayCartCount();
    displayCheckoutProdItems();
    displayProdonDetailsPage();
}
//Cart Products on Table
function generateCartItemHTML(allProduct) {
    return `<tr>
        <th class="cart_prod_title position-relative d-flex justify-content-center align-items-center">
            <img src="images/cross_btn.svg" alt="" class="cross_btn mx-auto position-absolute" onclick=removeCartItem(${allProduct.prodID})><img src="${allProduct.prodImg}" alt="" class="prod_img"> <span class="prod_title">${allProduct.prodTitle}</span>
        </th>
        <td>$${allProduct.price.originalPrice.toFixed(2)}</td>
        <td class="text-success">-$${allProduct.price.discountPrice.toFixed(2)}</td>
        <td>$${allProduct.price.currentPrice.toFixed(2)}</td>
    </tr>`;
};

//-------------------For Cart Price Summary
function displayCartSummary(){
    let totalItems = cartItemObjs.length;
    let totalPrice = 0;
    let totalDiscount = 0;
    let netPayment = 0;

    cartItemObjs.forEach(allProduct => {
        totalPrice += allProduct.price.originalPrice;
        totalDiscount += allProduct.price.originalPrice - allProduct.price.currentPrice;
        netPayment = totalPrice - totalDiscount;
    });

    let cartSummaryContainer = document.querySelector('.cart_sec .cart_price_sec');
    cartSummaryContainer.innerHTML = `<div class="cart_price mb-5">
        <h4 class="cmn_head_dark text_dark m-0"><strong>Cart Total (${totalItems})</strong></h4>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <p class="text_dark m-0">Subtotal</p>
            <p class="text_small text_dark m-0">$${totalPrice.toFixed(2)}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <p class="text_dark m-0">Discount</p>
            <p class="text_small text-success m-0">-$${totalDiscount.toFixed(2)}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <p class="text_dark m-0">Net Payable</p>
            <p class="text_small text_dark m-0">$${netPayment.toFixed(2)}</p>
        </div>
        <hr>
    </div>`;
};