import * as cart from "../../script/cart.js";

describe("Test suite : Add to cart", () => {
  it("Add item to cart", () => {
    const product = {
      productId: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
      quantity: 1,
      shippingId: "1",
    };
    cart.addToCart(product);
    expect(cart.cart.length).toEqual(5);
  });

  it("Add an existing item to the cart", () => {
    const product = {
      productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      quantity: 1,
      shippingId: "1",
    };
    cart.addToCart(product);
    expect(cart.cart.length).toEqual(5);
  });
});

describe("Test suite : Find Product", () => {
  it("Find an existing product to the cart", () => {
    const product = {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 36,
      shippingId: "1",
    };

    const matchingProduct = cart.findProductInCart(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );

    const result = JSON.stringify(matchingProduct) === JSON.stringify(product);
    expect(result).toEqual(true);
  });

  it("Find product doesn't exist to the cart", () => {
    const result = cart.findProductInCart("1");

    expect(result).toUndifined;
  });
});

describe("Test suite: Delete product", () => {
  it("Delete an existing product to the cart", () => {
    cart.deleteProductToTheCart("04701903-bc79-49c6-bc11-1af7e3651358");
    expect(cart.cart.length).toEqual(5);
  });

  it("Delete an none existing product to the cart", () => {
    cart.deleteProductToTheCart("1");
    expect(cart.cart.length).toEqual(5);
  });
});
