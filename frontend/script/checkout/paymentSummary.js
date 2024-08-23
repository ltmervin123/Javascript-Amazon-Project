
import { Cart } from "../cart-class.js";
import { currencyFormatter } from "../utils/money.js";
import { findProductInfoById } from "../../../data/products.js";
import { deliveryOptions } from "../deliveryOptions.js";

const paymentSummaryContainer = document.querySelector(".payment-summary");

export function generatePaymentSummary() {
  paymentSummaryContainer.innerHTML = `<div class="payment-summary-title">
    Order Summary
  </div>
  
  <div class="payment-summary-row">
    <div>Items (${getTotalItem()}):</div>
    <div class="payment-summary-money">$${calculateTotalItemCost()}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-shipping-payment-summary-money">$${calculateTotalShippingCost()}</div>
  </div>
  
  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money js-toal-before-tax">$${calculateTotalCostBeforeTax()}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money js-tax-summary">$${calculateTax()}</div>
  </div>
  
  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-total-payment">$${calculateTotaCost()}</div>
  </div>
  
  <button class="place-order-button button-primary">
    Place your order
  </button>`;
}

export function getTotalItem() {
  const cart = new Cart("normal-cart");
  let quantity = 0;
  cart.cartItem.forEach((product) => {
    quantity += product.quantity;
  });
  return quantity;
}

export function calculateTotalItemCost() {
  const cart = new Cart("normal-cart");
  let totaCost = 0;
  cart.cartItem.forEach((item) => {
    const matchingProduct = findProductInfoById(item.productId);
    totaCost += matchingProduct.priceCents * item.quantity;
  });
  return (totaCost / 100).toFixed(2);
}

export function calculateTotalShippingCost() {
  let totalCost = 0;
  const cart = new Cart("normal-cart");
  cart.cartItem.forEach((product) => {
    deliveryOptions.forEach((option) => {
      if (product.shippingId === option.id) {
        totalCost += option.shippingCostCent;
      }
    });
  });
  return currencyFormatter(totalCost);
}

export function calculateTotalCostBeforeTax() {
  const totalShippingCost = parseInt(calculateTotalShippingCost() * 100);
  const totalItemCost = parseInt(calculateTotalItemCost() * 100);
  const totalBeforeTax = totalShippingCost + totalItemCost;
  return currencyFormatter(totalBeforeTax);
}

export function calculateTax() {
  const tax = 10;
  const totalCostBeforeTax = parseInt(calculateTotalCostBeforeTax() * 100);
  const taxAmount = (totalCostBeforeTax * tax) / 100;
  return currencyFormatter(taxAmount);
}

export function calculateTotaCost() {
  const taxAmount = parseInt(calculateTax() * 100);
  const totolCostBeforeTax = parseInt(calculateTotalCostBeforeTax() * 100);
  const total = taxAmount + totolCostBeforeTax;
  return currencyFormatter(total);
}
