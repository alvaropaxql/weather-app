const wrapper = document.querySelector(".wrapper");
const inputSection = wrapper.querySelector(".input-section");
const infoTxt = inputSection.querySelector(".info-txt");
const inputField = inputSection.querySelector("input");

inputField.addEventListener("keyup", e => {
    if (e.key === "Enter" && inputField.value !== "") {
        requestApi(inputField.value);
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API key}`;
}