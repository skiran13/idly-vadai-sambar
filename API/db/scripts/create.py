
import requests as r
from pymongo import MongoClient
import csv
import random
import json
from bson.objectid import ObjectId
from pprint import pprint
BASE_URL = "http://localhost:8080/"
MAKE_RESTAURANT_ENDPOINT = "register"

email = "ivs@crio.com"
password = "abc@123"
restaurantId = "1234" # Ensure it doesn't repeat.

client = MongoClient()
db = client.criodemo

# def getRandomItems(num):
#     toReturn = list()
#     with open('../items_new.csv',newline="") as csvFile:
#         reader = csv.reader(csvFile,delimiter=',')
#         allRows = list()
#         for row in reader:
#             print(row)
#             allRows.append(row)
#         randomIndex = random.sample(range(len(allRows)),num)
#         for ind in randomIndex:
#             toReturn.append(allRows[ind])
#     return toReturn

def getRandomItems(num):
    toReturn = list()
    with open('../items_new.csv',newline="") as csvFile:
        fieldNames = ("itemid","name","imageUrl","price","quantity","preparationTimeInMinutes")
        reader = csv.DictReader(csvFile,delimiter=',')
        allRows = list()
        for row in reader:
            allRows.append(dict(row))
        randomIndex = random.sample(range(len(allRows)),num)
        for ind in randomIndex:
            toReturn.append(allRows[ind])
    return toReturn

def makeRestaurants():
    url = BASE_URL + MAKE_RESTAURANT_ENDPOINT
    data = {
        "email":email,
        "password":password,
        "restaurantId":restaurantId,
        "name":"Idly, Vadai, Sambar",
	    "city": "Bengaluru",
	    "imageUrl":"https://cdn.shopify.com/s/files/1/0151/0741/products/25_25433c56-74af-4f6d-8c17-caf378a84f7d_480x480.jpg?v=1500652453",
	    "latitude":"13.027",
	    "longitude":"77.567",
	    "opensAt":"0600",
	    "closesAt":"2300"
    }
    res = r.post(url = url,data = data)
    return res

def findMenuAddItems():
    res = makeRestaurants()
    res = json.loads(res.text)
    print("------ Created Restaurant -----")
    print(res)
    restId = res["Restaurant"]["_id"]
    restaurants = db.restaurants
    rest = restaurants.find_one({"_id":ObjectId(restId)})
    tempRestId = rest["restaurantId"] # Remove this, check with _id only
    menus = db.menus
    menu = menus.find_one({"restaurantId":tempRestId})
    items = menu["items"]
    toAdd = getRandomItems(10)
    for x in toAdd:
        items.append(x)
    
    menus.update_one({"restaurantId":tempRestId},{"$set":{"items":items}})
    print("--------Menu Updated---------")

findMenuAddItems()

# pprint(getRandomItems(1))