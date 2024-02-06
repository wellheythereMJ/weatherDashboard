/*API key 129df2e8b7a598f1885a7aee0dcc44ef
uses API key to pull from openweather API */

var userInput = document.querySelector("#userInput");
var currentWeatherdiv = document.querySelector("#currentWeather");
var cityList ={};
var citySubmit = document.querySelector("#citySubmit");
    citySubmit.addEventListener("click", function(){
      userInput.value;
      geoCode(userInput.value);
      makeButtons();
    })

    
    $('#generatedCities').click(function(){
      event.preventDefault();
      var city = event.target.textContent;
      geoCode(city);
    })
    
    function geoCode(cityName) {
      var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=5&appid=129df2e8b7a598f1885a7aee0dcc44ef"
      fetch(requestURL)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        var lat = data[0].lat;
        var lon = data[0].lon;
        currentWeatherdiv.children[0].textContent=data[0].name;
        currentWeather(lat, lon);
        FiveDayForecast(lat, lon);
        cityList[data[0].name]=data[0].name;
        localStorage.setItem('searchHistory', JSON.stringify(cityList));
        
      })
}

function currentWeather (lat, lon) {
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&appid=129df2e8b7a598f1885a7aee0dcc44ef&units=imperial"
  fetch(requestURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    currentWeatherdiv.children[3].textContent="Temp: "+data.main.temp+" °F";
    currentWeatherdiv.children[4].textContent="Wind: "+data.wind.speed+" mph";
    currentWeatherdiv.children[5].textContent="Humidity: "+data.main.humidity+" %";
    $('#currentDay').text(dayjs().format('MM/DD/YYYY'));
    $('#weatherIcon').attr('src', "http://openweathermap.org/img/w/"+data.weather[0].icon+".png");
  })
}
function FiveDayForecast (lat, lon) {
  var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=129df2e8b7a598f1885a7aee0dcc44ef&units=imperial'
  fetch(requestURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    var counter = 0;
    $('#forecastCards').children('div').each(function(){
      var tempDate = data.list[counter].dt_txt.slice('', 10);
      var year = tempDate.substr(0, 4);
      var month = tempDate.substr(5, 2);
      var day = tempDate.substr(8, 2);
      var date = month +"/"+ day + "/" + year;
      $(this).children('h4').text(date);
      $(this).children('img').attr('src', "http://openweathermap.org/img/w/"+data.list[counter].weather[0].icon+".png")
      $(this).children().children('.temp').text(data.list[counter].main.temp);
      $(this).children().children('.wind').text(data.list[counter].wind.speed);
      $(this).children().children('.humidity').text(data.list[counter].main.humidity);
      counter += 8
    })
  })
}

function makeButtons(){
  var searchHistory = $('#generatedCities');
  cityList = JSON.parse(localStorage.getItem('searchHistory'));
  searchHistory.html('');
  for (var key in cityList){
    var button = document.createElement('button');
    searchHistory.append(button);
    button.textContent = cityList[key];
  }
}

// makeButtons();