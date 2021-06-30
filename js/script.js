//Global variables

const xhr = new XMLHttpRequest();
let api = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city = 'Brussels';
let units = '&units=metric'
let apiKey = '&APPID=f1fe3a5b2ff45140872785bfb2753205';
let url = api+city+units+apiKey

//Get weather from openweathermap

function loadWeather(url){

    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status === 200){
            // hxr.status = this.status
            const forecast = JSON.parse(this.responseText);

            //Current weather

            document.getElementById("location").innerHTML = forecast.city.name+`, `+forecast.city.country;
            document.getElementById("icon").src = `http://openweathermap.org/img/wn/`+forecast.list[0].weather[0].icon+`@4x.png`;
            document.getElementById("description").innerHTML = (forecast.list[0].weather[0].description)[0].toUpperCase()+(forecast.list[0].weather[0].description).slice(1);
            document.getElementById("temperature").innerHTML = Math.round(forecast.list[0].main.temp)+' °C';
            document.getElementById("maxTemp").innerHTML = Math.round(forecast.list[0].main.temp_max)+' °';
            document.getElementById("minTemp").innerHTML = Math.round(forecast.list[0].main.temp_min)+' °';

            //Get all dates if hour = noon, so we are grabbing only one moment per day

            let dates = []
            for (let i=0; i<forecast.list.length; i++) {
                let day = new Date(forecast.list[i].dt * 1000).getDate();
                let currentDate = new Date().getDate();
                    if (day === currentDate) {

                    }
                    else {
                        let hour = new Date(forecast.list[i].dt * 1000).getHours()-2;
                        if (hour === 12) {
                            dates.push(forecast.list[i])
                        }
                    }
            }

            // Forecast

            for (let day=1; day<=4; day++) {
                let dayName = new Date(dates[day-1].dt*1000).toLocaleString('en-us', {weekday:'short'});
                let dayNumber = new Date(dates[day-1].dt * 1000).getDate();
                let month = (new Date(dates[day-1].dt * 1000)).toLocaleString('default',{month:'short'});

                document.getElementById(`date${day}`).innerHTML = dayName+`, `+dayNumber+` `+month;
                document.getElementById(`icon${day}`).src = `http://openweathermap.org/img/wn/`+dates[day-1].weather[0].icon+`@2x.png`;
                document.getElementById(`temperature${day}`).innerHTML = Math.round(dates[day-1].main.temp) + ' °C';
            }
        }
    }
    xhr.send();
};

//Get weather for Brussels on load

window.onload = function () {
    loadWeather(url)
};


//Get current weather for selected city

document.getElementById("showWeather").addEventListener("click", function() {
    city = document.getElementById("enterCity").value;
    url = api+city+units+apiKey
    loadWeather(url)

});
