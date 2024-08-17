import {
  cart,
  findProductInCart,
  deleteProductToTheCart,
  updateQuantity,
} from "../cart.js";
import { findProductInfoById } from "../../../data/products.js";
import {
  getDeliveryDates,
  determineShippingDays,
  addShippingId,
} from "../deliveryOptions.js";
import { currencyFormatter } from "../utils/money.js";
import {
  getTotalItem,
  calculateTotalItemCost,
  calculateTotalShippingCost,
  calculateTotalCostBeforeTax,
  calculateTax,
  calculateTotaCost,
  generatePaymentSummary,
} from "./paymentSummary.js";

const orderSummaryContainer = document.querySelector(".order-summary");
const checkOutHeaderSection = document.querySelector(
  ".js-checkout-header-middle-section"
);

export function generateOrderSummary() {
  let orderSummaryHtml = "";
  orderSummaryContainer.innerHTML = "";
  cart.forEach((product) => {
    let matchingProduct = findProductInfoById(product.productId);
    orderSummaryHtml += `<div class="cart-item-container">
          <div class="delivery-date" data-product-id="${matchingProduct.id}">
            Delivery date: ${getDeliveryDates(matchingProduct.id)}
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
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                  matchingProduct.id
                }">
                  Update
                </span>
               <input type="number" class="quantity-input js-quantity-input">
               <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                 matchingProduct.id
               }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link link-primary" data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
              <div class="quantity-validation-pop-up js-quantity-validation-pop-up">Invalid Quantity, quantity must be > 0 </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${
                    matchingProduct.id
                  }" value="0" data-shipping-id="1" data-product-id="${
      matchingProduct.id
    }" ${isChecked("1", matchingProduct.id) ? "checked" : ""}>
                <div>
                  <div class="delivery-option-date">
                    ${determineShippingDays(7)}
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              
  
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${
                    matchingProduct.id
                  }" value="4.99" data-shipping-id="2" data-product-id="${
      matchingProduct.id
    }" ${isChecked("2", matchingProduct.id) ? "checked" : ""}>
                <div>
                  <div class="delivery-option-date">
                  ${determineShippingDays(4)}
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
  
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"  
                  name="delivery-option-${
                    matchingProduct.id
                  }" value="9.99" data-shipping-id="3" data-product-id="${
      matchingProduct.id
    }" ${isChecked("3", matchingProduct.id) ? "checked" : ""}>
                <div>
                  <div class="delivery-option-date">
                  ${determineShippingDays(1)}
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

  //Eventlistener to update product in the cart by id
  document.querySelectorAll(".js-update-quantity-link").forEach((update) => {
    update.addEventListener("click", () => {
      const inputField = update.nextElementSibling;
      const saveQuantityLink = inputField.nextElementSibling;

      if (
        inputField &&
        inputField.classList.contains("quantity-input") &&
        saveQuantityLink &&
        saveQuantityLink.classList.contains("save-quantity-link")
      ) {
        // Toggle the 'show-input' class to show/hide the input field
        update.style.display = "none";
        inputField.classList.toggle("show-input");
        saveQuantityLink.classList.toggle("show-input-save-quality-link");
      }
    });
  });

  //Eventlistener to save product
  document.querySelectorAll(".js-save-quantity-link").forEach((save) => {
    save.addEventListener("click", () => {
      const inputField = save.previousElementSibling;
      const updateLink = save.previousElementSibling.previousElementSibling;
      const productId = save.getAttribute("data-product-id");
      const inputFieldValue = parseInt(inputField.value, 10);

      if (
        inputField &&
        inputField.classList.contains("quantity-input") &&
        updateLink &&
        updateLink.classList.contains("js-update-quantity-link")
      ) {
        //Handle quantity input
        if (validateQuantityInput(inputFieldValue)) {
          updateQuantity(productId, inputFieldValue); // call to update the product quantity
          loadPaymentSummary();
          loadPage(); // Re-render the UI to reflect the changes
          // Hide the input field and 'Save' link
          inputField.classList.remove("show-input");
          save.classList.remove("show-input-save-quality-link");
          // Show the 'Update' link
          updateLink.style.display = "inline";
        } else {
          displayWarning(save);
        }
      }
    });
  });

  // Eventlistener to delete product in the cart by Id
  document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      deleteProductToTheCart(productId);
      loadPaymentSummary();
      loadPage(); // Re-render the UI to reflect the changes
    });
  });

  //Eventlistener to determine the shipping cost
  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const shippingId = radio.getAttribute("data-shipping-id");
      const productId = radio.getAttribute("data-product-id");
      addShippingOption(productId, shippingId);
      reloadDeliveryDates(productId);
      loadPaymentSummary();
    });
  });
}
export function generateCheckOutItem() {
  let totalCheckOut = getTotalItem();
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

function displayWarning(save) {
  const productContainer = save.closest(".cart-item-container");
  const popUpWarning = productContainer.querySelector(
    ".js-quantity-validation-pop-up"
  );

  popUpWarning.style.opacity = 1;
  setTimeout(() => {
    popUpWarning.style.opacity = 0;
  }, 2000);
}

function validateQuantityInput(quantity) {
  return quantity > 0;
}

function isChecked(deliveryId, productId) {
  const matchingProduct = findProductInCart(productId);
  return matchingProduct.shippingId === deliveryId;
}

function addShippingOption(productId, shippingId) {
  addShippingId(productId, shippingId);
}

function loadPaymentSummary() {
  loadTotalCost();
  loadTotalBeforeTaxSummary();
  loadTaxAmountSummary();
  loadShippingAndHandling();
}

function loadTotalCost() {
  document.querySelector(
    ".js-total-payment"
  ).innerHTML = `$${calculateTotaCost()}`;
}

function loadShippingAndHandling() {
  document.querySelector(
    ".js-shipping-payment-summary-money"
  ).innerHTML = `$${calculateTotalShippingCost()}`;
}

function loadTotalBeforeTaxSummary() {
  document.querySelector(
    ".js-toal-before-tax"
  ).innerHTML = `$${calculateTotalCostBeforeTax()}`;
}

function loadTaxAmountSummary() {
  document.querySelector(".js-tax-summary").innerHTML = `$${calculateTax()}`;
}

function reloadDeliveryDates(productId) {
  document.querySelector(
    `.delivery-date[data-product-id="${productId}"]`
  ).innerHTML = `Delivery date: ${getDeliveryDates(productId)}`;
  console.log(cart);
}

export function loadPage() {
  generateOrderSummary();
  generateCheckOutItem();
  generatePaymentSummary();
}
