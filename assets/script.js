//API key 129df2e8b7a598f1885a7aee0dcc44ef
//uses API key to pull from openweather API //d
var weatherURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=129df2e8b7a598f1885a7aee0dcc44ef&units=imperial';

fetch(weatherURL)
    .then(function(response){
      return response.json();
    } )
    .then(function(data){
      console.log(data);
    })

