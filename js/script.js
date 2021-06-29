let api = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city = 'Brussels';
let units = '&units=metric'
let apiKey = '&APPID=f1fe3a5b2ff45140872785bfb2753205';
let url = api+city+units+apiKey

function loadWeather(url){

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status === 200){
            // hxr.status = this.status
            const forecast = JSON.parse(this.responseText);
            document.getElementById("location").innerHTML = forecast.city.name+`, `+forecast.city.country;
            document.getElementById("icon").src = `http://openweathermap.org/img/wn/`+forecast.list[0].weather[0].icon+`@4x.png`;
            document.getElementById("description").innerHTML = (forecast.list[0].weather[0].description)[0].toUpperCase()+(forecast.list[0].weather[0].description).slice(1);
            document.getElementById("temperature").innerHTML = Math.round(forecast.list[0].main.temp)+' °C';
            document.getElementById("maxTemp").innerHTML = Math.round(forecast.list[0].main.temp_max)+' °';
            document.getElementById("minTemp").innerHTML = Math.round(forecast.list[0].main.temp_min)+' °';
        }
    }
    xhr.send();
};

window.onload = function () {
    loadWeather(url)
};

document.getElementById("showWeather").addEventListener("click", function() {
    city = document.getElementById("enterCity").value;
    url = api+city+units+apiKey
    loadWeather(url)

});
