function get_nearby_grocery_stores(radius='1000', location='42.353499665,-71.1206825957', callback){
  //import api key and requirements
  const credentials_json = require('./credentials.json');
  const key = credentials_json['google'];
  var axios = require('axios');

  // add paramaters to the raw request URL
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location;
  var paramaters = {
    'radius': radius,
    'type': 'supermarket',
    'key': key
  };
  for (const paramater in paramaters){
    url += '&' + paramater + '=' + paramaters[paramater]
  };

  // send request and send JSON response to callback funciton
  var config = {
    method: 'get',
    url: url,
    headers: { }
  };
  axios(config)
  .then(function(response){ callback(response.data)})
  .catch(function (error) {
  console.log(error);
  });
} export default get_nearby_grocery_stores
