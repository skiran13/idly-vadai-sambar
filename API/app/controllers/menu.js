var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var Item = require('../models/item');

exports.getMenu = async function(req, res, next) {
  var restaurantId = req.params.restId;
  var menus = await Menu.findOne({
    restaurantId: restaurantId,
  });

  return res.status(200).send({
    items: menus.items,
    responseType: 200,
  });
};

exports.addItem = async function(req, res, next) {
  var restaurantId = req.params.restId;
  var menu = await Menu.findOne({
    restaurantId: restaurantId,
  });
  var itemJSON = {
    itemId: req.body.itemId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    preparationTimeInMinutes: req.body.preparationTimeInMinutes,
    quantity: req.body.quantity,
    available: '1',
  };
  var item = new Item(itemJSON);
  await item.save();
  menu.items.push(item);
  await menu.save();
  return res.status(200).send({
    item: item,
    responseType: 200,
  });
};

exports.updateItem = async function(req, res, next) {
  var restaurantId = req.params.restId;
  // var item = await Item.findById(req.params.itemId);
  var menu = await Menu.findOne({
    restaurantId: restaurantId,
  });
  var items = menu.items;

  var index;
  for (var j = 0; j < items.length; j++) {
    console.log(items[j])

    if (items[j].itemId.toString() === req.params.itemId) {
      index = j;
      break;
    }
  }
  var toEdit = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    preparationTimeInMinutes: req.body.preparationTimeInMinutes,
    quantity: req.body.quantity,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    available: req.body.available,
  };
  var keys = Object.keys(toEdit);
  for (var i in keys) {
    if (toEdit[keys[i]] != undefined) {
      menu.items[index][keys[i]] = toEdit[keys[i]];
    } else {
      menu.items[index][keys[i]] = menu.items[index][keys[i]];
    }
  }

  await menu.save();
  // var menu = Menu.findOne({
  //     restaurantId: restaurantId
  // });

  // for (var i in menu.items) {
  //     if (menu.items[i]._id === item._id) {
  //         menu.items.splice(i, 1);
  //     }
  // }

  // menu.items.push(item);
  return res.status(200).json({
    responseType: 200,
    item: menu.items,
    message: 'Updated Successfully',
  });
};

exports.getItem = async function(req, res, next) {
  var restaurantId = req.params.restId;
  var itemId = req.params.itemId;

  var menu = await Menu.findOne({
    restaurantId: restaurantId,
  });
  var items = menu.items;
  for (var i = 0; i < items.length; i++) {
    if (items[i].itemId === itemId) {
      return res.status(200).json({
        item: items[i],
        responseType: 200,
        message: 'Item Found',
      });
    }
  }

  return res.status(200).json({
    responseType: 404,
    message: 'Not Found',
  });
};

exports.deleteItem = async function(req, res, next) {
  var restaurantId = req.params.restId;
  var itemId = req.params.itemId;

  var menu = await Menu.findOne({
    restaurantId: restaurantId,
  });
  var items = menu.items;

  for (var i = 0; i < items.length; i++) {
    if (items[i].itemId.toString() === itemId) {
      menu.items.splice(i, 1);
      await menu.save();
      return res.status(200).json({
        responseType: 200,
        message: 'Found and deleted item.',
      });
    }
  }

  return res.status(200).json({
    responseType: 404,
    message: 'Item not found / deleted',
  });
};
