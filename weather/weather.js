const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/109f76f4750d250114c94f2a8af52019/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) 
    {
      callback('Unable to connect to Forecast.io server.');
    } 
    else if (response.statusCode === 400)
     {
      callback('Unable to fetch weather.');
    } 
    else if (response.statusCode === 200)
     {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        summary:body.currently.summary,
        expectedSummary:body.hourly.summary
      });
    }
  });
};

module.exports.getWeather = getWeather;
