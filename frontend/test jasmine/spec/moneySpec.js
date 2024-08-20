import { currencyFormatter } from "../../script/utils/money.js";

describe("Test suite : Currency formatter", () => {
  it("Convert cent into dollar", () => {
    expect(currencyFormatter(2095)).toEqual("20.95");
  });

  it("Tests the basic conversion of 100 cents to 1 dollar.", () => {
    expect(currencyFormatter(100)).toEqual("1.00");
  });

  it("Tests the function with zero to ensure it returns 0.0 .", () => {
    expect(currencyFormatter(0)).toEqual("0.00");
  });

  it("Tests the conversion of an amount less than a dollar.", () => {
    expect(currencyFormatter(99)).toEqual("0.99");
  });

  it("Tests the conversion of a larger amount.", () => {
    expect(currencyFormatter(12345)).toEqual("123.45");
  });

  it("Tests how the function handles negative values.", () => {
    expect(currencyFormatter(-100)).toEqual("-1.00");
  });

  it("Tests the smallest non-zero amount.", () => {
    expect(currencyFormatter(1)).toEqual("0.01");
  });

  it("Tests handling of very large numbers close to floating point precision limits.", () => {
    expect(currencyFormatter("F")).toEqual("NaN");
  });
});
