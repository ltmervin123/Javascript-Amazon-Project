// import { cartQuantity } from "./amazon.js";
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const findProductInCart = (productId) => {
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



export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
