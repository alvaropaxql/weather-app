const wrapper = document.querySelector(".wrapper");
const inputSection = wrapper.querySelector(".input-section");
const infoTxt = inputSection.querySelector(".info-txt");
const inputField = inputSection.querySelector("input");
const locationButton = inputSection.querySelector("button");

let pai;

inputField.addEventListener("keyup", e => {
    if (e.key === "Enter" && inputField.value !== "") {
        requestApi(inputField.value);
    }
});

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) { // if supported by the browser
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser does not support the geolocation api.");
    }
});

function onSuccess(position) {
    const {
        latitude,
        longitude
    } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apiKey}`;
    fecthData();
}

function onError(error) {
    infoTxt.textContent = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKey}`;
    fecthData();
}

function fecthData() {
    infoTxt.textContent = "Getting weather details...";
    infoTxt.classList.add("pending");
    /*after getting the api response, it is parsed into an object and passed as an argument to another function via then() */
    fetch(api).then(response => response.json().then(result => weatherDetails(result)));
}

function weatherDetails(info) {
    if (info.cod === "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.textContent = `${inputField.value} is not a valid city name.`;
    } else {
        // get propierties
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}