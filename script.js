const wrapper = document.querySelector(".wrapper");
const inputSection = wrapper.querySelector(".input-section");
const infoTxt = inputSection.querySelector(".info-txt");
const inputField = inputSection.querySelector("input");
const locationButton = inputSection.querySelector("button");
const weatherIcon = wrapper.querySelector("#state");
const arrowBack = wrapper.querySelector("header i");

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

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

function onSuccess(position) {
    const {
        latitude,
        longitude
    } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${config.apiKey}`;
    fecthData();
}

function onError(error) {
    infoTxt.textContent = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.apiKey}`;
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
        const {
            description,
            id
        } = info.weather[0];
        const {
            feels_like,
            humidity,
            temp
        } = info.main;

        // set icon
        if (id === 800) { // clear
            weatherIcon.classList.replace("fa-cloud", "fa-sun");
        } else if (id >= 200 && id <= 232) { // strom
            weatherIcon.classList.replace("fa-cloud", "fa-bolt");
        } else if (id >= 600 && id <= 622) { // snow
            weatherIcon.classList.replace("fa-cloud", "fa-snowflake");
        } else if (id >= 701 && id <= 781) { // haze, smog , "calima"
            weatherIcon.classList.replace("fa-cloud", "fa-smog");
        } else if (id >= 801 && id <= 804) { //cloud
            weatherIcon.classList.replace("fa-cloud", "fa-cloud");
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) { // rain
            weatherIcon.classList.replace("fa-cloud", "fa-cloud-rain");
        }

        // set values
        wrapper.querySelector(".temp .number").textContent = Math.floor(temp);
        wrapper.querySelector(".weather").textContent = description;
        wrapper.querySelector(".location span").textContent = `${city}, ${country}`;
        wrapper.querySelector(".temp .number-2").textContent = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").textContent = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
}