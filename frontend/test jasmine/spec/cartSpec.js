import * as cart from "../../script/cart.js";

describe("Test suite : Add to cart", () => {
  it("Add item to cart", () => {
    const product = {
      productId: "04701903-bc79-49c6-bc11-1af7e3651358",
      quantity: 1,
      shippingId: "1",
    };
    cart.addToCart(product);
    expect(cart.cart.length).toEqual(6);
  });

  it("Add an existing item to the cart", () => {
    const product = {
      productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      quantity: 1,
      shippingId: "1",
    };
    cart.addToCart(product);
    expect(cart.cart.length).toEqual(6);
  });
});

describe("test Suit : Find Product", () => {
  it("Find an existing product to the cart", () => {
    const product = {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
      shippingId: "1",
    };

    const matchingProduct = cart.findProductInCart(
      "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
    );

    const result = JSON.stringify(matchingProduct) === JSON.stringify(product);

    expect(result).toEqual(true);
  });

  it("Find product doesn't exist to the cart", () => {
    const result = cart.findProductInCart("1") || false;

    expect(result).toEqual(false);
  });
});
