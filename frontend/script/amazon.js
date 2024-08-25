import { products } from "../../data/ClassProduct.js";
import { Cart } from "./cart-class.js";

const productGrid = document.querySelector(".products-grid");
const cartQuantity = document.querySelector(".cart-quantity");
let html = "";

function generateHtml() {
  products.forEach((products) => {
    html += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${products.getStar()}">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${products.getPrice()}
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

        ${products.displayLink()}

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
}

generateHtml();
updateCartQuantity();

const addToCartButton = document.querySelectorAll(".add-to-cart-button");

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const currentProduct = {
      productId: button.getAttribute("data-product-id"),
      productName: button.getAttribute("data-product-name"),
      productPriceInCent: button.getAttribute("data-product-price-cent"),
      quantity: parseInt(
        event.target
          .closest(".product-container")
          .querySelector(".product-quantity").value
      ),
    };
    const cart = new Cart("normal-cart");
    cart.addToCart(currentProduct);
    updateCartQuantity();
    addTextEffectWhenItemIsAdded(button);
  });
});

function updateCartQuantity() {
  let quantity = 0;
  const cart = new Cart("normal-cart");
  cart.cartItem.forEach((product) => {
    quantity += product.quantity;
  });
  cartQuantity.textContent = quantity;
}

function addTextEffectWhenItemIsAdded(button) {
  const productContainer = button.closest(".product-container");
  const addedToCartMessage = productContainer.querySelector(".added-to-cart");

  // Set initial opacity
  addedToCartMessage.style.opacity = 1;

  setTimeout(() => {
    addedToCartMessage.style.opacity = 0;
  }, 1500);
}
