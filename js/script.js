//Global variables

const xhr = new XMLHttpRequest();
let api = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city = 'Brussels';
let units = '&units=metric'
let apiKey = '&APPID=f1fe3a5b2ff45140872785bfb2753205';
let url = api+city+units+apiKey
let dates = []

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

            //Forecast


            for (let i=0; i<forecast.list.length; i++) {
                let hour = new Date(forecast.list[i].dt * 1000).getHours()-2;
                if (hour === 12) {
                    dates.push(forecast.list[i])
                    console.log(dates)
                    // console.log(hour)
                }

            // for (let i=0; i<dates.length; i++) {
            //     console.log(dates)
            //     console.log(dates.length)
            //     let date = new Date(dates[i].dt * 1000);
            //     let dayName = new Date(dates[i].dt * 1000).getDay();
            //         if (dayName === 0){dayName="Mon, "}
            //         if (dayName === 1){dayName="Tue, "}
            //         if (dayName === 2){dayName="Wed, "}
            //         if (dayName === 3){dayName="Thu, "}
            //         if (dayName === 4){dayName="Fri, "}
            //         if (dayName === 5){dayName="Sat, "}
            //         if (dayName === 6){dayName="Sun, "}
            //     let day = new Date(dates[i].dt * 1000).getDate();
            //     let month = new Date(dates[i].dt * 1000).getMonth();
                // console.log(date)
                // console.log(dayName)
                // console.log(day)
                // console.log(month)

            }

            for (let day=1; day<=5; day++) {
                document.getElementById(`date${day}`).innerHTML = new Date(dates[day-1].dt*1000);
                document.getElementById(`icon${day}`).src = `http://openweathermap.org/img/wn/`+dates[day-1].weather[0].icon+`@2x.png`;
                document.getElementById(`temperature${day}`).innerHTML = Math.round(dates[day-1].main.temp) + ' °C';
            // }
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
