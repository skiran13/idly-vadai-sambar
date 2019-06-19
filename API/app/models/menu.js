var mongoose = require('mongoose');

var addressJSON = {
  name: String,
  fullAddress: String,
  city: String,
  locality: String,
  postalCode: String,
  lat: String,
  lng: String,
}

var itemJSON = {
  itemId: String,
  name: String,
  imageUrl: String,
  price: Number,
  preparationTimeInMinutes: Number,
  quantity: Number,
  available: String
  // cuisine: String,
  // description: String
}

var menuJSON = {

  restaurantId: String,

  items: [
    itemJSON
  ]
}



var MenuSchema = new mongoose.Schema(menuJSON, {
  timestamps: true
});


module.exports = mongoose.model('Menu', MenuSchema);