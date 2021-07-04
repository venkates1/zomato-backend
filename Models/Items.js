const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemsSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingridients: {
        type: Array,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('item', menuItemsSchema);
