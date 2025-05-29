let productonCart;
onload();

function onload() {
    let itemInCart = localStorage.getItem('productonCart')
    // If product is present in the cart else Empty
    productonCart = itemInCart ? JSON.parse(itemInCart) : [];
    // Showing All the Products
    displayProdsonPage();
    // Showing Product Count on Cart
    displayCartCount();

};


//Cart Quantity Function
function displayCartCount() {
    let cartCount = document.querySelector('#cart_quantity');
    cartCount.innerText = productonCart.length;
};


// Add to Cart Button Function
function addtoCart(prodID) {
    productonCart = JSON.parse(localStorage.getItem('productonCart')) || [];

    // Check if the Product already exists
    if (productonCart.includes(prodID)) {
        alert("Due to excessive demand, Maximum purchasable quantity is 1");
        return;
    }
    // Add new Product
    productonCart.push(prodID);
    localStorage.setItem('productonCart', JSON.stringify(productonCart));

    // Show alert only if not on product-details page
    if (!window.location.pathname.includes('product-details.html')) {
           alert("Product is added in the cart!");
    }

    // Showing Product Count on Cart
    displayCartCount();
};

// Get Product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('prodID');
}


// Making the HTML and Assigning All the Products
function displayProdsonPage() {
    let mainProductWrap = document.querySelector('.product_sec .row');
    //Code for Cart Quantity in Cart Page
    if (!mainProductWrap) {
        return;
    }
    let printHtmlonPage = '';

    allProduct.forEach(product => {
        // Add 'invisible' class if featureTxt is not present
        const featureTextClass = product.featureTxt ? 'feature_text rounded-pill' : 'feature_text rounded-pill invisible';
        const featureTextContent = product.featureTxt || '';
        printHtmlonPage += `<div class="col-md-6 col-lg-4 mt-4">
        <div class="each_product mx-auto">
            <h4 class="${featureTextClass}">${featureTextContent}</h4>
            <img src="${product.prodImg}" alt="${product.prodTitle}" class="prod_img mx-auto">
            <h3 class="text_dark fw-semibold fs-6 my-3">${product.prodTitle}</h3>
            <img src="${product.prodStar}" alt="Star Icon" class="star_icon mx-auto"> 
            <p class="price_text text_dark my-3"><strong>Price: $${product.price.currentPrice.toFixed(2)}</strong> <span class="text-decoration-line-through ms-3">$${product.price.originalPrice.toFixed(2)}</span></p>
            <div class="cta_sec">
                <a href="javascript:void(0);" class="add_cart_btn" onclick="addtoCart(${product.prodID});">Add to Cart</a>
                <a href="product-details.html?prodID=${product.prodID}" class="cta_btn">Buy Now</a>
            </div>
        </div>
        </div>`;
    });

    mainProductWrap.innerHTML = printHtmlonPage;
};