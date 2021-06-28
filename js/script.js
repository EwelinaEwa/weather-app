document.getElementById("showWeather").addEventListener("click", loadWeather);

function loadWeather(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q=Tielt&units=metric&APPID=f1fe3a5b2ff45140872785bfb2753205', true);

    xhr.onload = function(){
        if(this.status === 200){
            // hxr.status = this.status
            const forecast = JSON.parse(this.responseText);
            document.getElementById("location").innerHTML = forecast.city.name;
            // document.getElementById("icon").innerHTML = ;
            document.getElementById("description").innerHTML = forecast.list[0].weather[0].description;
            document.getElementById("temperature").innerHTML = forecast.list[0].main.temp;
            document.getElementById("maxTemp").innerHTML = forecast.list[0].main.temp_max;
            document.getElementById("minTemp").innerHTML = forecast.list[0].main.temp_min;
        }
    }
    xhr.send();
}
