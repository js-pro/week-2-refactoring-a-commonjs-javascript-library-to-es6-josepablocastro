"use strict"

module.exports = {
  /*
   * Define una distancia entre 2 puntos. La distancia
   * es descrita por un punto A, un punto B y la distance en 
   * KM entre ellos.
   */
  Distance: class {
    constructor(a, b, distance) {
      this.a = a;
      this.b = b;
      this.distance = distance;
    }
  },

  /*
   * Define un punto geográfico descrito por una longitud,
   * una longitud y un identificador.
   */
  Point: class {
    constructor(lat, lon, id) {
      this.lat = lat;
      this.lon = lon;
      this.id  = id;
    }

    /* 
     * Cálcula la distancia entre el punto y otro punto. 
     * 
     * Regresa la distancia en KM.
     */
    distanceFrom(otherPoint) {
      var lat1 = this.lat;
      var lon1 = this.lon;

      var lon2 = otherPoint.lon;
      var lat2 = otherPoint.lat;

      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
              c(lat1 * p) * c(lat2 * p) * 
              (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
  },

  /*
   * Agrega un nuevo punto a la lista de puntos.
   *
   * Regresa una nueva lista de puntos.
   */
  addPoint: function(point, points) {
    var newPoints = [];
    points.forEach((item, index, array) => {
      newPoints.push(item);
    });
    newPoints.push(point);
    return newPoints;
  },

  /*
   * Cálcula las distancias entre un punto y una lista de puntos. 
   * Si la distancia entre los puntos satisface el parámetro establecido
   * agrega la distancia al listado de resultados.
   *
   * En caso de que no se especifíque una distancia máxima, las distancias
   * siempre se agregan al resultado.
   *
   * Regresa un listado con las distancias seleccionadas.
   */
  closePointsFrom: function(point, points, maxDistance) {
    var validPoints = [];
    var isValidPoint = false;

    points.forEach((item, index, array) => {
      var d = point.distanceFrom(item);
      if(maxDistance == undefined || d <= maxDistance) {
        validPoints.push( new this.Distance(point, item, d));
      }
    });
    return validPoints;
  }
};

