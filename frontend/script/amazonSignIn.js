const needHelpDropDown = document.getElementById("needHelpDropDown");
const dropDownIcon = document.getElementById("dropDownIcon");
const dropDownLink = document.querySelector(".dropDownLink");
const menuList = document.querySelector(".menuList");
const continueButton = document.getElementById("continueButton");

menuList.style.display = "none";
const displayMenu = () => {
  const computedStyle = window.getComputedStyle(dropDownIcon).transform;
  if (
    computedStyle === "none" ||
    computedStyle === "matrix(1, 0, 0, 1, 0, 0)"
  ) {
    dropDownIcon.style.transform = "rotate(270deg)";
    menuList.style.display = "none";
  } else if (computedStyle === "matrix(0, -1, 1, 0, 0, 0)") {
    dropDownIcon.style.transform = "rotate(0deg)";
    menuList.style.display = "block";
  }
};

const validateUser = () => {
  const input = {
    email: document.getElementById("inputEmail").value,
    password: document.getElementById("inputPassword").value,
  };

  if (input.email && input.password) {
    if (input.email === "user" && input.password === "password") {
      window.location.href = "frontend/html/amazon.html";
    } else {
      displayWarning();
    }
  }
};

const displayWarning = () => {
  const warningLabel = document.querySelector(".warning");

  if (warningLabel.style.display === "none") {
    warningLabel.style.display = "block";
  } else {
    warningLabel.style.display = "none";
  }
};

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("inputPassword");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon (optional)
    this.src =
      type === "password"
        ? "frontend/images/eye.png"
        : "frontend/images/hidden.png";
  });

displayWarning();
checkInputs();
needHelpDropDown.addEventListener("click", displayMenu);
dropDownIcon.addEventListener("click", displayMenu);
continueButton.addEventListener("click", validateUser);

document.getElementById("inputEmail").addEventListener("input", checkInputs);
document.getElementById("inputPassword").addEventListener("input", checkInputs);

function checkInputs() {
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  const continueButton = document.querySelector(".continueButton");

  if (email && password) {
    continueButton.disabled = false;
    continueButton.style.cursor = "pointer";
  } else {
    continueButton.disabled = true;
    continueButton.style.cursor = "not-allowed";
  }
}
