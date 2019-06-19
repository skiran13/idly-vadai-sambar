var mongoose = require('mongoose');

var itemJSON = {
    itemId: String,
    name: String,
    imageUrl: String,
    price: Number,
    preparationTimeInMinutes: Number,
    quantity: Number,
    available: Number
    // cuisine: String,
    // description: String
}

var ItemSchema = new mongoose.Schema(itemJSON, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);