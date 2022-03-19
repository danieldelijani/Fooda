// get google API credential from credentials.json
<script type="text/javascript" src="credentials.json"></script>
var gKey = String(JSON.parse(credentials)[google]);

// load places API library from google
<script async // maybe remove curly braces around link ?
    src={"https://maps.googleapis.com/maps/api/js?key=" + gKey + "&libraries=places&callback=initMap"}>
</script>

function get_nearby_grocery_stores(radius='500'){

    var loc_center = new google.maps.LatLng(0,0);
    map = new google.maps.Map(document.getElementById('map'), {
        center: loc_center,
        zoom: 15
    });
  
    var request = {
      location: loc_center,
      radius: radius,
      type: ['convenience_store', 'liquor_store', 'supermarket']
    };

    service = new google.maps.places.PlacesService(map); 
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }