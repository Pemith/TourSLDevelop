const mongoose = require('mongoose');
const Joi = require('joi');

const restaurantSchema = new mongoose.Schema({



const restaurant = mongoose.model('Restaurants', restaurantSchema);

function validateRestaurant(restaurant) {



    return schema.validate(restaurant);
}


