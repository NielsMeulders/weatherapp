(function () {
    /*global $, jQuery*/
    "use strict";
    var App, myApp, x, y, temp, icon, summ, lastclear, location;
    
    
    function getLocation() {
        
        if (localStorage.getItem('lastclear') != undefined)
        {
            lastclear = localStorage.getItem('lastclear');
        }
        else
        {
            lastclear = 1000 * 60 * 60 * 60;
        }
        var time_now  = (new Date()).getTime();

        if ((time_now - lastclear) > 1000 * 60 * 60) {

            localStorage.clear();

            localStorage.setItem('lastclear', time_now);
            
            if (navigator.geolocation) 
            {
                navigator.geolocation.getCurrentPosition(success, error);
            } 
            else 
            { 
                console.log('error');
            }
            
        }
        else
        {
            if (localStorage.getItem('res') != undefined)
            {
                var localweather = JSON.parse(localStorage.getItem("res"));
                temp = Math.round((Math.round(localweather.currently.temperature)-32) * 5/9) + "°";
                icon = getIcon(localweather.currently.icon);
                summ = localweather.currently.summary;
                location = "Weer voor " + localweather.timezone;
            }
            else
            {
                if (navigator.geolocation) 
                {
                    navigator.geolocation.getCurrentPosition(success, error);
                } 
                else 
                { 
                    console.log('error');
                }
            }
        }
        
        document.getElementById('timezone').innerHTML = location;
        document.getElementById('temperature').innerHTML = temp;
        document.getElementById('icon').innerHTML = icon;
        document.getElementById('summary').innerHTML = summ;
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
                    
                    

                    temp = Math.round((Math.round(result.currently.temperature)-32) * 5/9) + "°";
                    icon = getIcon(result.currently.icon);
                    summ = result.currently.summary;
                    console.log(result.currently);
                    
                    
                    localStorage.setItem("res", JSON.stringify(result));

                    
                    
                    var terug = JSON.parse(localStorage.getItem("res"));
                    console.log(terug);
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


function getIcon(p_icon)
{
    var icon;
    switch (p_icon)
                    {
                        case 'clear-day': 
                            icon = 'A';
                            break;
                            
                        case 'clear-night':
                            icon = 'I';
                            break;
                            
                        case 'rain': 
                            icon = 'R';
                            break;
                            
                        case 'snow':
                            icon = 'W';
                            break;
                            
                        case 'sleet': 
                            icon = 'X';
                            break;
                            
                        case 'wind':
                            icon = 'a';
                            break;
                            
                        case 'fog': 
                            icon = 'O';
                            break;
                            
                        case 'cloudy':
                            icon = 'C';
                            break;
                            
                        case 'partly-cloudy-day': 
                            icon = 'D';
                            break;
                            
                        case 'partly-cloudy-night':
                            icon = 'J';
                            break;
                        
                        
                    }
    return icon;

}