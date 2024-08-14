// import { cartQuantity } from "./amazon.js";
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const findProductInCart = (productId) => {
  return cart.find((product) => product.productId === productId);
};

export const addToCart = (currentProduct) => {
  let matchingProduct = findProductInCart(currentProduct.productId);

  if (matchingProduct) {
    matchingProduct.quantity += currentProduct.quantity;
  } else {
    cart.push({
      productId: currentProduct.productId,
      //productName: currentProduct.productName,
      quantity: currentProduct.quantity,
      shippingId: "1"
      //productPriceInCent: currentProduct.productPriceInCent,
    });
  }
  saveCart();
};

export function deleteProductToTheCart(id) {
  const index = cart.findIndex((product) => product.productId === id);
  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart
    console.log(`Item with id ${id} has been removed.`);
    saveCart(); // Save the updated cart to the localstorage
  } else {
    console.log(`Item with id ${id} not found.`);
  }
  console.log(cart);
}

export function updateQuantity(productId, newQuantity) {
  const matchingProduct = findProductInCart(productId);
  matchingProduct.quantity = newQuantity;
  saveCart();
}

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
