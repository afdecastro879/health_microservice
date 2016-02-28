exports = module.exports = function(app, mongoose) {

  var PethSchema = new mongoose.Schema({
    _id: { type: Number },
    value:{
      enfermo:{type:Boolean},
      loc: {
        type: {
          type: "String",
          required: true,
          enum: ['Point', 'LineString', 'Polygon'],
          default: 'Point'
        },coordinates: [Number]
      },
    }
  }, { collection: 'perros_result' });
  PethSchema.index({ 'loc': '2dsphere' });
  mongoose.model('Peth', PethSchema,'perros_result');

};
