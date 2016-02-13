
var distance = function(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }; 

module.exports = {

  newPoint: function(lat, lon, id) {
    return {lat: lat, lon: lon, id: id };
  },

  addPoint: function(point, points) {
    var newPoints = [];
    points.forEach(function (item, index, array) {
      newPoints.push(item);
    });
    newPoints.push(point);
    return newPoints;
  },

  closePointsFrom: function(point, points, maxDistance) {
    var validPoints = [];
    var isValidPoint = false;

    points.forEach(function (item, index, array) {

      var d = distance(point.lat, point.lon, item.lat, item.lon);

      if(maxDistance == undefined || d <= maxDistance) {
        validPoints.push( {a: point, b: item, distance: d});
      }

    });
    return validPoints;
  }
};

