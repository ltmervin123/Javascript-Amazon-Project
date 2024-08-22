function Cart(localStorageKey) {
  const cart = {
    cartItem: undefined,

    loadCartFromLocalStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    findProductInCart(productId) {
      return this.cartItem.find((product) => product.productId === productId);
    },

    addToCart(currentProduct) {
      let matchingProduct = this.findProductInCart(currentProduct.productId);
      if (matchingProduct) {
        matchingProduct.quantity += currentProduct.quantity;
      } else {
        this.cartItem.push({
          productId: currentProduct.productId,
          quantity: currentProduct.quantity,
          shippingId: "1",
        });
      }
      this.saveCart();
    },

    deleteProductToTheCart(id) {
      const index = this.cartItem.findIndex(
        (product) => product.productId === id
      );
      if (index !== -1) {
        this.cartItem.splice(index, 1); // Remove the item from the cart
        this.saveCart(); // Save the updated cart to the localstorage
      } else {
        console.log(`Item with id ${id} not found.`);
      }
    },

    updateQuantity(productId, newQuantity) {
      const matchingProduct = this.findProductInCart(productId);
      matchingProduct.quantity = newQuantity;
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },
  };

  return cart;
}

const cart = Cart("normal-cart");
const businessCart = Cart("business-cart");
