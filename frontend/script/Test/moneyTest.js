import { currencyFormatter } from "../utils/money.js";

function currencyFormatterTest(testCase, expectesResult) {
  if (currencyFormatter(testCase) === expectesResult) {
    console.log("Passed");
  } else {
    console.log(
      `Failed Expected Result is ${expectesResult} but it was ${currencyFormatter(
        testCase
      )}`
    );
  }
}

currencyFormatterTest(2090, "20.90");
currencyFormatterTest(0, "0.00");
currencyFormatterTest(1090, "10.90");
