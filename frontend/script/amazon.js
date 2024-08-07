//Add to cart functionality
const productGrid = document.querySelector(".products-grid");
const cartQuantity = document.querySelector(".cart-quantity");
let quantity = 0;

const generateHtml = () => {
  let html = "";
  products.forEach((products) => {
    html += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="../images/ratings/rating-${
            products.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${products.priceCents / 100}
        </div>

        <div class="product-quantity-container">
          <p class="quantityLabel">Quantity</p>
          <select class="product-quantity">
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

        <button class="add-to-cart-button button-primary" data-product-id="${
          products.id
        }" data-product-name="${products.name}" data-product-price-cent="${
      products.priceCents
    }">
          Add to Cart
        </button>
      </div>`;
  });
  productGrid.innerHTML = html;
};
generateHtml();

const addToCartButton = document.querySelectorAll(".add-to-cart-button");

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const productName = button.getAttribute("data-product-name");
    const productPriceInCent = button.getAttribute("data-product-price-cent");
    // const quantitySelect = event.target
    //   .closest(".product-container")
    //   .querySelector(".product-quantity").value;

    // Check if the product already exists in the cart
    if (findProductById(productId)) {
      // If the product is found, store it in a variable
      const matchingItem = findProductById(productId);

      // Increment the quantity of the existing product by 1
      matchingItem.quantity++;
    } else {
      
      // If the product is not found, add a new product to the cart with the provided details
      cart.push({
        productId,
        productName,
        quantity,
        productPriceInCent,
      });
    }
    console.log(cart);
  });
});

// Function to find a product in the cart by its productId
const findProductById = (id) => {
  return cart.find((product) => product.productId === id);
};

const updateQuantity = () => {
  quantity++;
  cartQuantity.textContent = quantity;
};
