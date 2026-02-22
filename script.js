const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".convert-btn")
fromCurr = document.querySelector(".from select");
toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let amount = document.querySelector(".amount .amount-box input");

amount.value="1";


document.addEventListener("load", () => {
    updateExchangeRate();
});

let i = 0;
for(let select of dropdowns)
{
    for (let currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
        {
            newOption.selected = "Selected";
        }
        else if(select.name === "to" && currCode === "INR")
        {
            newOption.selected = "Selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amtVal = amount.value;
    // console.log(amtVal)
    if(amtVal === "" || amtVal < 1)
    {
        amtVal = 1;
        amount.value="1";
    }

    fromCurrValue = fromCurr.value.toLowerCase();
    toCurrValue = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromCurrValue}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data[fromCurrValue][toCurrValue];
    let FinalAmt = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${fromCurrValue.toUpperCase()} = ${FinalAmt} ${toCurrValue.toUpperCase()}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});