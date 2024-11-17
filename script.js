const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");
const inputText = document.querySelector("input");
const outputText = document.querySelector(".msg p");
const switchBtn = document.querySelector(".switchSides");

let i = 0;
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;

  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if ((amtVal === "", amtVal < 1)) {
    amtVal = 1;
    amtVal.value = "1";
  }

  console.log(fromCurr.value);

  finalCurrConv(
    String(fromCurr.value).toLowerCase(),
    String(toCurr.value).toLowerCase()
  );
});

const finalCurrConv = async (f, t) => {
  console.log("getingdata");
  const URL = `https://latest.currency-api.pages.dev/v1/currencies/${f}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);

  if ( inputText.value == "") {
    inputText.value = 0;
  }

  const newF = data[f];
  console.log(newF[t]);
  console.log((inputText.value * newF[t]).toFixed(2));

  outputText.innerText = `${inputText.value} ${String(f).toUpperCase()} = ${(
    inputText.value * newF[t]
  ).toFixed(2)} ${String(t).toUpperCase()}`;
};

let temp = "";
const haha = switchBtn.addEventListener("click", (e) => {
  temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  finalCurrConv(
    String(fromCurr.value).toLowerCase(),
    String(toCurr.value).toLowerCase()
  );
});

inputText.addEventListener("input", (e) => {
  finalCurrConv(
    String(fromCurr.value).toLowerCase(),
    String(toCurr.value).toLowerCase()
  );
  console.log(e.target.value);
});

let isDarkTheme = false;

      function toggleTheme() {
        const themeButton = document.querySelector('.theme-toggle-btn');
        const themeStyle = document.getElementById('theme-style');
        if (isDarkTheme) {
          themeStyle.setAttribute('href', 'stylee.css');
          themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
          themeStyle.setAttribute('href', 'style.css'); 
          themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        isDarkTheme = !isDarkTheme;
      }