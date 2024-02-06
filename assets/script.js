/*API key 129df2e8b7a598f1885a7aee0dcc44ef
uses API key to pull from openweather API */
function FiveDayForecast(lat, lon){
  var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=129df2e8b7a598f1885a7aee0dcc44ef&units=imperial';
  
  fetch(weatherURL)
      .then(function(response){
        return response.json();
      } )
      .then(function(data){
        console.log(data);

/*inside the data.list has forcast info 8times aday for 5 days so pick the indexes that have the time you want
use that index you find to apply to individual cards
need to figure out how to get individual cards and apply information. give each card an ID and do children method as below
if you have time think about how to creat the cards dynamically */
      })
}


var userInput = document.querySelector("#userInput");
var currentWeatherdiv = document.querySelector("#currentWeather")
  
var citySubmit = document.querySelector("#citySubmit");
    citySubmit.addEventListener("click", function(){
      userInput.value;
      console.log(userInput.value);
      geoCode(userInput.value);
    })
function geoCode(cityName) {
    var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=5&appid=129df2e8b7a598f1885a7aee0dcc44ef"
    fetch(requestURL)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(data){
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      currentWeatherdiv.children[0].textContent=data[0].name;
      currentWeather(lat, lon);
      FiveDayForecast(lat, lon);
/*add data[0].name to local storage
add in json stringify to add arry to local storage
need json parce to get out of location storage */
    })
}

function currentWeather (lat, lon) {
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&appid=129df2e8b7a598f1885a7aee0dcc44ef&units=imperial"
  fetch(requestURL)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log(data);
    currentWeatherdiv.children[1].textContent="Temp: "+data.main.temp+" °F";
    currentWeatherdiv.children[2].textContent="Wind: "+data.wind.speed+" mph";
    currentWeatherdiv.children[3].textContent="Humidity: "+data.main.humidity+" %";
  })
}