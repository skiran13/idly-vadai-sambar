var mongoose = require('mongoose');

var itemJSON = {
    itemId:String,
    name:String,
    price:Number,
    // imageUrl:String,
    // preparationTimeInMinutes:String,
    quantity:Number
}

var orderJSON = {

    restaurantId: String,
    userId: String,
    userName: String,
    total:Number,
    latitude: Number,
    longitude: Number,
    statusId: Number,
    status:[String],
    items: [itemJSON]
}



var OrderSchema = new mongoose.Schema(orderJSON, {
    timestamps: true
});


module.exports = mongoose.model('Order', OrderSchema);