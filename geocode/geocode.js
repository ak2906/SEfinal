const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
//
//https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=680a48c2ad9b43da852b2c2e45583b3a
//
  request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=680a48c2ad9b43da852b2c2e45583b3a`,
    json: true
  }, (error, response, body) => {
    if (error) 
    {
      callback('Unable to connect to servers.');
    }
     else if (body.status.message === 'ZERO_RESULTS') 
     {
      callback('Unable to find that address.');
    } 
    else if (body.status.message === 'OK') 
    {
      callback(undefined, {
        address: body.results[0].formatted,
        latitude: body.results[0].geometry.lat,
        longitude: body.results[0].geometry.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
