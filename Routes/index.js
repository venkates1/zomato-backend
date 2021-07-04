const express = require("express");

const router = express.Router();

const locationsController = require("../Controllers/Locations");
const restaurantsDataController = require("../Controllers/Restaurants");
const mealTypeController = require("../Controllers/MealType");
const paymentGatewayController = require("../Controllers/PaymentGateway");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/user");
const userController = require("../Controllers/User");

//api routes
router.get("/locations", locationsController.getLocations);

router.get(
  "/locations/getRestByLocation/:locationId",
  restaurantsDataController.getRestaurantsByLocationId
);

router.get("/mealtypes", mealTypeController.getMealTypes);
router.post("/filter", restaurantsDataController.filterRestaurants);
router.get(
  "/restaurantdetailsbyid/:restaurantId",
  restaurantsDataController.getRestaurantDetailsById
);

router.get(
  "/menuitemsbyrestaurant/:restaurantId",
  restaurantsDataController.getMenuItemsByRestaurant
);
router.post("/payment", paymentGatewayController.payment);
router.post('/callback', paymentGatewayController.callback);

router.post('/signup', validateSignupRequest, isRequestValidated, userController.signup);
router.post('/signin', validateSigninRequest, isRequestValidated, userController.signin);
module.exports = router;
