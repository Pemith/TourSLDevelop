const mongoose = require('mongoose');
const Joi = require('joi');

const restaurantSchema= new mongoose.Schema({

    cuisine:{
        type: String,
        required: true,
    },
    menu: {
        type: String
    },
    diningType:{
        type:String,
        required: true
    }

});

const restaurant=mongoose.model('restaurant',restaurantSchema);

function validateRestaurant(restaurant){

    const schema=Joi.object({
        cuisine:Joi.string().required(),
        menu: Joi.string().required(),
        diningType:Joi.string().required()
    }).options({abortEarly:false});

    return schema.validate(restaurant);
}




exports.Restaurant=restaurant;
exports.validate=validateRestaurant;



