// import { cartQuantity } from "./amazon.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const findProductById = (productId) => {
  return cart.find((product) => product.productId === productId);
};

export const addToCart = (currentProduct) => {
  cart.push({
    productId: currentProduct.productId,
    //productName: currentProduct.productName,
    quantity: currentProduct.quantity,
    //productPriceInCent: currentProduct.productPriceInCent,
  });
  saveCart();
};

export function addTextEffectWhenItemIsAdded(button) {
  const productContainer = button.closest(".product-container");
  const addedToCartMessage = productContainer.querySelector(".added-to-cart");

  // Set initial opacity
  addedToCartMessage.style.opacity = 1;

  setTimeout(() => {
    addedToCartMessage.style.opacity = 0;
  }, 1500);
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
