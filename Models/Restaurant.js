const mongoose = require('mongoose');
const Joi = require('joi');

const restaurantSchema = new mongoose.Schema({

    Cuisine: {
        type: [String],
        required: true,
    },
    Menu: {
        type: String
    },
    Dining_Type: {
        type: [String],
        required: true,
        minLength: 2
    }

});

const restaurant = mongoose.model('Restaurants', restaurantSchema);

function validateRestaurant(restaurant) {

    const schema = Joi.object({
        Cuisine: Joi.string().required(),
        Menu: Joi.string().required(),
        Dining_Type: Joi.string().min(2).required()
    }).options({ abortEarly: false });

    return schema.validate(restaurant);
}

exports.restaurant = restaurant;
exports.validate = validateRestaurant;