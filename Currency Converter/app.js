const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropDowns = document.querySelectorAll(".dropDown select");
const button = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with country codes
for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode.toLowerCase();
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

// Function to update flag images
const updateFlag = (element) => {
    let currCode = element.value.toLowerCase();
    let countryCode = countryList[currCode.toUpperCase()];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Function to fetch and update exchange rate
const updateExchangeRate = async () => {
    let amtVal = document.querySelector(".amount input").value || "1";
    amtVal = parseFloat(amtVal); // Convert input to float

    const from = fromCurr.value;
    const to = toCurr.value;
    const URL = `${base_URL}/${from.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        if (!data[from.toLowerCase()] || !data[from.toLowerCase()][to.toLowerCase()]) {
            console.error(`Invalid currency or not supported by API: ${from} to ${to}`);
            msg.innerText = "Error fetching exchange rate.";
            return;
        }

        let rate = parseFloat(data[from.toLowerCase()][to.toLowerCase()]); // Convert rate to float
        let finalAmount = (amtVal * rate).toFixed(4); // Display up to 4 decimal places

        // Ensure exchange rate is formatted properly
        let formattedRate = rate.toFixed(6); // Show up to 6 decimal places for accuracy

        // Fixed message format with floating numbers
        msg.innerHTML = `${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()} <br> 1 ${from.toUpperCase()} = ${formattedRate} ${to.toUpperCase()}`;
        console.log(`Exchange Rate Updated: 1 ${from.toUpperCase()} = ${formattedRate} ${to.toUpperCase()}`);
    } catch (error) {
        console.error("Error fetching currency data:", error);
        msg.innerText = "Error fetching exchange rate.";
    }
};

// Event listener for button click
button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Auto update on page load
window.onload = () => {
    updateExchangeRate();
};
