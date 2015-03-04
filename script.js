(function () {
    /*global $, jQuery*/
    "use strict";
    var App, myApp, x, y;
    
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else { 
        console.log('error');}
    }
    
    function success(position) {
        y = position.coords.longitude;
        x = position.coords.latitude;
        var locatie = x + "," + y;
        console.log(locatie);
        var location_standard = "37.8267,-122.423";
        var url = "https://api.forecast.io/forecast/7df4a8ead9a4572bf91f2a69224d9867/" + locatie;
        
        $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function (result) {
                
                var temp = Math.round((Math.round(result.currently.temperature)-32) * 5/9);
                
                //localStorage.setItem("stations", JSON.stringify(stations));
                
                document.getElementById('temperature').innerHTML = temp;
            },
            error: function () {
                
            }
        });
    }
    
    function error() {
        
    };
    
    App = function () {
    this.showWeather = function () {
        getLocation();
        
    };
};


myApp = new App();
myApp.showWeather();

}());