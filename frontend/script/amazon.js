//Add to cart functionality
const addToCartButton = document.querySelector('.add-to-cart-button');
const cartQuantity = document.querySelector('.cart-quantity');
const productGrid = document.querySelector('.products-grid');
let quantity = 0;

// const calculateQuantity = () =>{

// } 
// products.forEach((products) => {
//     console.log(products.id);
// });

const generateHtml = () =>{
    let html = '';
    products.forEach((products) =>{
        html += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="../images/ratings/rating-${products.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${products.priceCents}
        </div>

        <div class="product-quantity-container">
          <p class="quantityLabel">Quantity</p>
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="../images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>`;
    })

    productGrid.innerHTML = html;
}

generateHtml();