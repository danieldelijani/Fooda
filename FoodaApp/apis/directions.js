async function get_directions(origin, destination, mode) {
  /**
   * @param destination must be a placeID string. 
   * example: 'place_id:ChIJf0QQ6cV544kR852uAss73Js'
   * 
   * @param origin must be a string of the form 'lattitude,longitude' 
   * example: '42.3528765,-71.1324396'
   * 
   * @param mode options are 'transit', 'walking', 'driving', 'bicycling'
   * 
   * @param callback funciton to call with the results when they return
   */

  //import api key and requirements
  const credentials_json = require('./credentials.json');
  const key = credentials_json['google'];
  var axios = require('axios');

  // add paramaters to the raw request URL
  var url = "https://maps.googleapis.com/maps/api/directions/json?";
  var paramaters = {
    'destination': destination,
    'origin': origin,
    'mode': mode,
    'key': key,
  };
  for (const paramater in paramaters) {
    url += '&' + paramater + '=' + paramaters[paramater]
  };

  // send request and send JSON response to callback funciton
  var config = {
    method: 'get',
    url: url,
    headers: {}
  };
  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
} export default get_directions

function test() {
  var hongkongsupermarket = '42.3528765,-71.1324396'; //lat,lng
  var allstonmarket = 'place_id:ChIJf0QQ6cV544kR852uAss73Js'; //placeID
  resp = get_directions(hongkongsupermarket, allstonmarket, 'walking');
  resp.then((res) => {
    console.log(res)
  })
}