function get_directions(destination, origin){
    //import api key and requirements
    const credentials_json = require('./credentials.json');
    const key = credentials_json['google'];
    var axios = require('axios');
  
    // add paramaters to the raw request URL
    var url = "https://maps.googleapis.com/maps/api/directions/json?"
    ;
    var paramaters = {
      'destination': destination,
      'origin': 'origin',
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
  } export default get_directions
  