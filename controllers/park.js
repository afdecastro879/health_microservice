var mongoose = require('mongoose');
var Park  = mongoose.model('Park');
var Pet  = mongoose.model('Pet');

exports.findCloseParks = function (req, res) {
  Pet.findOne({
      id_mascota: req.params.pet
  }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                message: 'not found'
            });
        } else {

            var query = Park.find({
              "loc": {
                "$geoNear": {
                    "type": "Point",
                    "coordinates": response.loc.coordinates,
                    "spherical": true,
                    "maxDistance": 1
                }
              }
            });
            //console.log(response);
            query.exec(function(err,docs) {
              if (err) throw err;
              //console.log("D: "+docs);
              res.send({
                  success: true,
                  pet:response,
                  parks: docs
              });
            });
            console.log('success');
        }
  });
};
