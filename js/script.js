// const apiKey = f1fe3a5b2ff45140872785bfb2753205;
// const city = document.getElementById("enterCity").value;
const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Tielt&units=metric&APPID=f1fe3a5b2ff45140872785bfb2753205';

//Detail shown at the page load

const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);

xhr.onload = function(){
    if(this.status === 200){
        // hxr.status = this.status
        const forecast = JSON.parse(this.responseText);
        document.getElementById("location").innerHTML = forecast.city.name;
        document.getElementById("icon").src = `http://openweathermap.org/img/wn/`+forecast.list[0].weather[0].icon+`@2x.png`;
        document.getElementById("description").innerHTML = (forecast.list[0].weather[0].description)[0].toUpperCase()+(forecast.list[0].weather[0].description).slice(1);
        document.getElementById("temperature").innerHTML = Math.round(forecast.list[0].main.temp)+' °C';
        document.getElementById("maxTemp").innerHTML = Math.round(forecast.list[0].main.temp_max)+' °';
        document.getElementById("minTemp").innerHTML = Math.round(forecast.list[0].main.temp_min)+' °';
    }
}
xhr.send();

//Details shown after another city chosen

document.getElementById("showWeather").addEventListener("click", loadWeather);

function loadWeather(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status === 200){
            // hxr.status = this.status
            const forecast = JSON.parse(this.responseText);
            document.getElementById("location").innerHTML = forecast.city.name;
            document.getElementById("icon").src = `http://openweathermap.org/img/wn/`+forecast.list[0].weather[0].icon+`@2x.png`;
            document.getElementById("description").innerHTML = (forecast.list[0].weather[0].description)[0].toUpperCase()+(forecast.list[0].weather[0].description).slice(1);
            document.getElementById("temperature").innerHTML = Math.round(forecast.list[0].main.temp)+' °C';
            document.getElementById("maxTemp").innerHTML = Math.round(forecast.list[0].main.temp_max)+' °';
            document.getElementById("minTemp").innerHTML = Math.round(forecast.list[0].main.temp_min)+' °';
        }
    }
    xhr.send();
}

// 'http://openweathermap.org/img/wn/10d.png'