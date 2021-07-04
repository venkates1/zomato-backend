const Restaurants = require('../Models/Restaurants');
const Items = require('../Models/Items');

exports.getRestaurantsByLocationId = (req,res) => {
    const locationId = req.params.locationId;
    Restaurants.find({ location_id: locationId })
    .then(response => {
        res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurants: response })
    })
    .catch(err => res.status(500).json(err))
}




exports.filterRestaurants = (req, res) => {

    const { locationId, mealTypeId, cuisine, lcost, hcost} = req.body;
     
    const sort = req.body.sort ? req.body.sort : 1;
    const page = req.body.page ? req.body.page : 1;
     

    
        
     let payload = {};

     if (mealTypeId) {
        payload = { mealtype_id: mealTypeId }
    }
    if (mealTypeId && locationId) {
        payload = { mealtype_id: mealTypeId, location_id: locationId }
    }
    if (mealTypeId && lcost && hcost) {
        payload = {
            mealtype_id: mealTypeId,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealTypeId && locationId && lcost && hcost) {
        payload = {
            mealtype_id: mealTypeId,
            location_id: locationId,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    if (mealTypeId && cuisine) {
        payload = { 
            mealtype_id: mealTypeId, 
            cuisine: { $in : cuisine }
    }
}

    if (mealTypeId && locationId && cuisine) {
        payload = {
            mealtype_id: mealTypeId,
            location_id: locationId,
            cuisine: { $in : cuisine }
        }
    }
    if (mealTypeId && cuisine && lcost && hcost){
        payload = {
            mealtype_id: mealTypeId,
            cuisine: { $in : cuisine },
            min_price: { $lte: hcost, $gte: lcost}
        }
    }

    
    if (mealTypeId && locationId && cuisine && lcost && hcost){
        payload = {
            mealtype_id: mealTypeId,
            location_id:locationId,
            cuisine: { $in : cuisine },
            min_price: { $lte: hcost, $gte: lcost}
        }
    }

    Restaurants.find(payload).sort({ min_price: sort })
    .then(response => {
        // pagination logic 
        const countPerPage = 2; 
        let startIndex = page * countPerPage - 2;
        let endIndex = page * countPerPage;
        let slicedArray = response.slice(startIndex, endIndex);
        res.status(200).json({ restaurants: slicedArray })
        
        const filteredResponse = response.slice();
        res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurants: filteredResponse })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}


exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurants.findById(restaurantId)
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurant: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getMenuItemsByRestaurant = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Items.find({ restaurantId: restaurantId })
        .then(response => {
            res.status(200).json({ message: "MenuItems Fetched Succesfully", items: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
