exports = module.exports = function(app, mongoose) {

  var parkSchema = new mongoose.Schema({
    idParque: { type: Number },
    loc: {
      type: {
        type: "String",
        required: true,
        enum: ['Point', 'LineString', 'Polygon'],
        default: 'Point'
      },coordinates: [Number]
    },
    mascotas:[
        {
         id_mascota: { type: Number },
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
    ]
  }, { collection: 'parques_perros' });
  parkSchema.index({ 'loc': '2dsphere' });
  mongoose.model('Park', parkSchema,'parques_perros');
};
