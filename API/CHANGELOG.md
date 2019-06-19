# Changelog

## v0.0.0

* Login route works
* JWT Token generation method(s) added.
* JWT Authorization made optional
* Menu routes (Add item to menu & get menu) added

## v0.0.1

* More Menu routes (Get/Delete/Update item)
* Added : Python Scripts to create database and populate it with single restaurant and menu entities
* Modified : Python Script / Mongo Models to accomodate `available` field for items
* Modified : Every route now uses `itemID` instead of `item._id` to make the URL look compact

## v0.0.2

* Modified : Added more data on restaurant login. Now sends latitude, longitude and restaurantID
* Added : Controller functions to order controller. Can place order, get active/pending/past/all orders, change order status and cancel order

## v0.0.3

* Added : Workflows for placing/cancelling an order, restaurant accepting/rejecting an order and changing order status
* Added : Routes to get active/pending/past/all orders using restaurant id.
* Modified : Made restaurantId unique
* Added : Total Number of orders are given post login.

## v0.0.4

* Added : Quantity Check in backend, total calculation and item retrieval is done from backend while placing an order
* Added : Routes to get stats on orders.