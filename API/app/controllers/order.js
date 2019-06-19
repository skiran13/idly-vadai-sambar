var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var Item = require('../models/item');
var Order = require('../models/order');
var orderEnum = require('../enums/orderStatus').orderStatus;

exports.placeOrder = async function(req, res, next) {
  var restaurantId = req.params.restId;
  var userId = req.body.userId;
  var userName = req.body.userName;
  var lat = req.body.latitude;
  var lng = req.body.longitude;
  var items = req.body.items;
  var finalItems = [];
  var total = 0;
  var menu = await Menu.findOne({
    restaurantId: restaurantId,
  });

  var visited = [];

  for (var x = 0; x < menu.items.length; x++) {
    for (var y = 0; y < items.length; y++) {
      if (menu.items[x].itemId == items[y].itemId) {
        visited.push(y);
        if (menu.items[x].quantity < items[y].quantity) {
          return res.status(422).send({
            responseType: 422,
            message:
              'Item: ' +
              menu.items[x].name +
              ' has lesser quantity in inventory than demand',
          });
        }
        // Make total by summing and decrease qty from inventory
        items[y].price = menu.items[x].price;
        finalItems.push(items[y]);
        total +=
          parseFloat(menu.items[x].price) * parseFloat(items[y].quantity);
        menu.items[x].quantity -= items[y].quantity;
      }
    }
  }
  visited.sort();

  var orderJSON = {
    restaurantId: restaurantId,
    userId: userId,
    userName: userName,
    total: total,
    latitude: lat,
    longitude: lng,
    items: finalItems,
    statusId: orderEnum.PLACED,
    status:
      'Order Placed at ' +
      new Date().toTimeString() +
      ' on ' +
      new Date().toDateString(),
  };

  var order = new Order(orderJSON);
  await order.save();
  await menu.save();
  return res.status(200).send({
    responseType: 200,
    order: order,
    message: 'Order Placed',
  });

  // var itemIDs = items.map(function (e) {
  //     return e._id
  // });

  // for (var i = 0; i < availableItems.length; i++) {
  //     if (itemIDs.includes(availableItems[i]._id)) {

  //     }
  // }
};

exports.cancelOrder = async function(req, res, next) {
  var orderId = req.body.orderId;
  // var userId = req.body.userId;
  var order = await Order.findById(orderId);

  // if (userId != order.userId) {
  //     return res.status(401).send({
  //         responseType: 401,
  //         message: "Unauthorized Action, you are not the user who placed the order"
  //     })
  // }
  if (order.statusId < orderEnum.PLACED) {
    return res.status(422).send({
      responseType: 422,
      message: 'Order has already been rejected or cancelled',
    });
  }
  if (order.statusId >= orderEnum.PICKED_UP) {
    return res.status(422).send({
      responseType: 422,
      message: 'Order is already ready. Can not be cancelled',
    });
  }

  order.statusId = orderEnum.CANCELLED;
  order.status.push(
    'Cancelled at ' +
      new Date().toTimeString() +
      ' on ' +
      new Date().toDateString()
  );
  await order.save();

  return res.status(200).send({
    responseType: 201,
    message: 'Order has been cancelled',
  });
};

exports.acceptOrder = async function(req, res, next) {
  var orderId = req.body.orderId;
  var order = await Order.findById(orderId);
  if (order.statusId != orderEnum.PLACED) {
    return res.status(422).send({
      responseType: 422,
      message:
        'You are trying to accept an order that is already accepted or cancelled.',
    });
  }

  order.statusId = orderEnum.ACCEPTED;
  order.status.push(
    'Order Accepted at ' +
      new Date().toTimeString() +
      ' on ' +
      new Date().toDateString()
  );
  await order.save();
  return res.status(200).send({
    responseType: 200,
    order: order,
    message: 'Order Accepted',
  });
};

exports.rejectOrder = async function(req, res, next) {
  var orderId = req.body.orderId;
  var order = await Order.findById(orderId);
  if (order.statusId != orderEnum.PLACED) {
    return res.status(422).send({
      responseType: 422,
      message:
        'You are trying to reject an order that has been accepted or rejected already.',
    });
  }
  order.statusId = orderEnum.REJECTED;
  order.status.push(
    'Order Rejected at ' +
      new Date().toTimeString() +
      ' on ' +
      new Date().toDateString()
  );
  await order.save();
  return res.status(200).send({
    responseType: 200,
    order: order,
    message: 'Order Rejected',
  });
};
exports.changeOrderStatus = async function(req, res, next) {
  var orderId = req.body.orderId;
  var orderStatus = req.body.orderStatus;
  var pickedUpFlag = req.body.pickedUpFlag;

  var order = await Order.findById(orderId);

  if (order.statusId < orderEnum.PLACED) {
    return res.status(422).send({
      responseType: 422,
      message: 'Can not change order status as order is not active.',
    });
  }
  if (order.statusId == orderEnum.PLACED) {
    return res.status(422).send({
      responseType: 422,
      message: 'Order has not been accepted, can not change status',
    });
  }
  if (order.statusId >= orderEnum.PICKED_UP) {
    return res.status(422).send({
      responseType: 422,
      message: 'Order has already been picked up. Can not change status',
    });
  }

  if (pickedUpFlag) {
    order.status.push(
      orderStatus +
        ' at ' +
        new Date().toTimeString() +
        ' on ' +
        new Date().toDateString()
    );
    order.statusId = orderEnum.PICKED_UP;
  } else {
    order.status.push(
      orderStatus +
        ' at ' +
        new Date().toTimeString() +
        ' on ' +
        new Date().toDateString()
    );
  }
  await order.save();
  return res.status(200).send({
    responseType: 200,
    message: 'Order status changed',
  });
};

exports.getActiveOrders = async function(req, res, next) {
  var restaurantId = req.params.restaurantId;
  var orders = await Order.find({
    restaurantId: restaurantId,
  });
  var toReturn = [];
  for (var x = 0; x < orders.length; x++) {
    if (orders[x].statusId === orderEnum.ACCEPTED) {
      toReturn.push(orders[x]);
    }
  }

  return res.status(200).send({
    responseType: 200,
    orders: toReturn,
  });
};

exports.getPastOrders = async function(req, res, next) {
  var restaurantId = req.params.restaurantId;
  var orders = await Order.find({
    restaurantId: restaurantId,
  });
  var toReturn = [];
  for (var x = 0; x < orders.length; x++) {
    if (
      orders[x].statusId >= orderEnum.PICKED_UP ||
      orders[x].statusId === orderEnum.CANCELLED
    ) {
      toReturn.push(orders[x]);
    }
  }

  return res.status(200).send({
    responseType: 200,
    orders: toReturn,
  });
};

exports.getPendingOrders = async function(req, res, next) {
  var restaurantId = req.params.restaurantId;
  var orders = await Order.find({
    restaurantId: restaurantId,
  });
  var toReturn = [];
  for (var x = 0; x < orders.length; x++) {
    if (orders[x].statusId === orderEnum.PLACED) {
      toReturn.push(orders[x]);
    }
  }

  return res.status(200).send({
    responseType: 200,
    orders: toReturn,
  });
};

exports.getAllOrders = async function(req, res, next) {
  var restaurantId = req.params.restaurantId;
  var orders = await Order.find({
    restaurantId: restaurantId,
  });
  return res.status(200).send({
    responseType: 200,
    orders: orders,
  });
};

exports.getStats = async function(req, res, next) {
  var orders = await Order.find({
    restaurantId: req.params.restaurantId,
  });
  // if (orders == null) {
  //     res.status(200).send({
  //         responseType: 200,
  //         status: {
  //             active: 0,
  //             cancelled: 0,
  //             past: 0,
  //             rejected: 0,
  //             pending: 0
  //         }
  //     })
  // }
  var pending = orders.filter(function(e) {
    if (e.statusId === orderEnum.PLACED) {
      return e;
    }
  });
  var active = orders.filter(function(e) {
    if (e.statusId === orderEnum.ACCEPTED) {
      return e;
    }
  });
  var cancelled = orders.filter(function(e) {
    if (e.statusId === orderEnum.CANCELLED) {
      return e;
    }
  });

  var past = orders.filter(function(e) {
    if (e.statusId === orderEnum.PICKED_UP) {
      return e;
    }
  });

  var rejected = orders.filter(function(e) {
    if (e.statusId === orderEnum.REJECTED) {
      return e;
    }
  });

  var toReturn = {
    active: active.length,
    cancelled: cancelled.length,
    past: past.length,
    rejected: rejected.length,
    pending: pending.length,
  };

  return res.status(200).send({
    responseType: 200,
    status: toReturn,
  });
};
