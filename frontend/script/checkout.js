import { cart } from "./cart.js";
import { findProductInfoById } from "../../data/products.js";
import { currencyFormatter } from "./utils/money.js";
import { deleteProductToTheCart } from "./cart.js";

const orderSummaryContainer = document.querySelector(".order-summary");
const paymentSummaryContainer = document.querySelector(".payment-summary");
const checkOutHeaderSection = document.querySelector(
  ".js-checkout-header-middle-section"
);
// const deliveryOptionInput = document.querySelectorAll(".delivery-option-input");
let orderSummaryHtml = "";
let shippingCost = 0;

function generateOrderSummary() {
  orderSummaryHtml = "";
  orderSummaryContainer.innerHTML = "";
  cart.forEach((product) => {
    let matchingProduct = findProductInfoById(product.productId);
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
              $${currencyFormatter(matchingProduct.priceCents)}
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
              <span class="delete-quantity-link link-primary js-delete-quantity-link link-primary" data-product-id="${
                matchingProduct.id
              }">
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
                name="delivery-option-${matchingProduct.id}" value="0">
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
                name="delivery-option-${matchingProduct.id}" value="4.99">
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
                name="delivery-option-${matchingProduct.id}" value="9.99">
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

  // Evenlistener for Delete product in the cart by Id
  document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      deleteProductToTheCart(productId);
      loadPage(); // Re-render the UI to reflect the changes
    });
  });

  //Eventlistener to determine the shipping cost
  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const selectedValue = parseFloat(event.target.value);
      calculateShippingCost(selectedValue);
    });
  });
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
}

function generatePaymentSummary() {
  paymentSummaryContainer.innerHTML = `<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${getTotalItem()}):</div>
  <div class="payment-summary-money">$${calculateTotaCost()}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$4.99</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$47.74</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$4.77</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$52.51</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>`;
}

function calculateTotaCost() {
  let totaCost = 0;
  cart.forEach((item) => {
    const matchingProduct = findProductInfoById(item.productId);
    totaCost += matchingProduct.priceCents * item.quantity;
  });
  return (totaCost / 100).toFixed(2);
}

function getTotalItem() {
  return cart.length;
}

function loadPage() {
  generateOrderSummary();
  generateCheckOutItem();
  generatePaymentSummary();
}

function calculateShippingCost(shippingCost) {}

loadPage(); //Load the pages
