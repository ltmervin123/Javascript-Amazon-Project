import { cart } from "./cart.js";
import { products } from "../../data/products.js";

const orderSummaryContainer = document.querySelector(".order-summary");
const paymentSummaryContainer = document.querySelector(".payment-summary");
const checkOutHeaderSection = document.querySelector(
  ".js-checkout-header-middle-section"
);
let orderSummaryHtml = "";
let paymentSummaryHtml = "";

function generateOrderSummary() {
  cart.forEach((product) => {
    let matchingProduct = findProductById(product.productId);

    orderSummaryHtml += `<div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${matchingProduct.priceCents / 100}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${
                  product.quantity
                }</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  orderSummaryContainer.innerHTML = orderSummaryHtml;
  document.querySelector(".order-summary").innerHTML = orderSummaryHtml;
}

function generateCheckOutItem() {
  let totalCheckOut = cart.length;
  let checkOutHeaderSectionHtml = "";

  if (totalCheckOut > 1) {
    checkOutHeaderSectionHtml = `<div class="checkout-header-middle-section js-checkout-header-middle-section">
  Checkout (<a class="return-to-home-link" href="amazon.html">${totalCheckOut} items</a>)
</div>`;
  } else {
    checkOutHeaderSectionHtml = `<div class="checkout-header-middle-section js-checkout-header-middle-section">
  Checkout (<a class="return-to-home-link" href="amazon.html">${totalCheckOut} item</a>)
</div>`;
  }

  checkOutHeaderSection.innerHTML = checkOutHeaderSectionHtml;
  console.log(cart);
}

function generatePaymentSummary() {}

const findProductById = (productId) => {
  return products.find((product) => product.id === productId);
};

generateOrderSummary();
generateCheckOutItem();
