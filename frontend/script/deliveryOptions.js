import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { Cart } from "./cart-class.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    shippingCostCent: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    shippingCostCent: 4.99 * 100,
  },
  {
    id: "3",
    deliveryDays: 1,
    shippingCostCent: 9.99 * 100,
  },
];

export function addShippingId(productId, shippingId) {
  const cart = new Cart("normal-cart");
  const matchingProduct = cart.findProductInCart(productId);
  matchingProduct.shippingId = shippingId;
  cart.saveCart();
}

export function getDeliveryDates(productId) {
  let matchingShippingOption;
  const cart = new Cart("normal-cart");
  const matchingProduct = cart.findProductInCart(productId);

  deliveryOptions.forEach((option) => {
    if (option.id === matchingProduct.shippingId) {
      matchingShippingOption = option;
    }
  });

  if (matchingShippingOption) {
    return determineShippingDays(matchingShippingOption.deliveryDays);
  } else {
    console.log("No matching product");
  }
}

export function determineDeliveryDates(shippingDays) {
  const currentDate = dayjs();
  return currentDate.add(shippingDays, "day");
}

export function formatDates(dates) {
  return dates.format("dddd, MMMM D");
}

export function determineShippingDays(shippingDays) {
  const deliveryDates = determineDeliveryDates(shippingDays);
  return formatDates(deliveryDates);
}
