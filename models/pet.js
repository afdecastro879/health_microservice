exports = module.exports = function(app, mongoose) {

  var PetSchema = new mongoose.Schema({
    id_mascota: { type: Number },
    loc: {
      type: {
        type: "String",
        required: true,
        enum: ['Point', 'LineString', 'Polygon'],
        default: 'Point'
      },coordinates: [Number]
    },
  }, { collection: 'pet_gen_json' });
  PetSchema.index({ 'loc': '2dsphere' });
  mongoose.model('Pet', PetSchema,'pet_gen_json');

};
