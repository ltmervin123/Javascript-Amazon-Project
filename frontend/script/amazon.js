import { products } from "../../data/products.js";
import {
  cart,
  findProductInCart,
  addToCart,
  addTextEffectWhenItemIsAdded,
} from "./cart.js";
import { currencyFormatter } from "../script/utils/money.js";

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
          <img class="product-rating-stars" src="../images/ratings/rating-${
            products.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${currencyFormatter(products.priceCents)}
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
      quantity: event.target
        .closest(".product-container")
        .querySelector(".product-quantity").value,
    };

    const matchingItem = findProductInCart(currentProduct.productId);
    if (matchingItem) {
      matchingItem.quantity =
        parseInt(currentProduct.quantity) + parseInt(matchingItem.quantity);
    } else {
      addToCart(currentProduct);
    }
    updateCartQuantity();
    addTextEffectWhenItemIsAdded(button);
  });
});

function updateCartQuantity() {
  const quantity = cart.length;
  cartQuantity.textContent = quantity;
}
