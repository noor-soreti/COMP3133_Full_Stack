const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

// All details
// http://localhost:3000/restaurants
// Sort id in ASC or DESC order
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {

    if(Object.keys(req.query).length === 0) {
        const restaurant = await restaurantModel.find({});
        try {
            console.log("Success");
            res.status(200).send(restaurant)
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        const restaurant = await restaurantModel.find({}).select("_id cuisine name city restaurant_id");;
        const sortValue = req.query.sortBy.toLowerCase()
        switch (sortValue) {
            case 'asc':
            restaurant.sort(x=> x.restaurant_id)
            res.status(200).send(restaurant)
                break;
            case 'desc':
                restaurant.sort(x=> x.restaurant_id).reverse()
                res.status(200).send(restaurant)
                break;        
            default:
                res.status(500).send("Select ASC or DESC order")
                break;
        }
    }

})

// Details by cuisine
// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
    console.log("GET - cuisine");
    
    const cuisine = req.params.cuisine
    const restaurants = await restaurantModel.find({cuisine: cuisine})

    try {
        res.status(200).send(restaurants)

    } catch(e) {
        res.status(500).send(e)
    }    
})

// Cuisine detail is Delicatessen
// http://localhost:3000/restaurants/Delicatessen
app.get("/restaurants/Delicatessen", async (req, res) => {
    const restaurant = await restaurantModel.find({}).where('city').ne('Brooklyn').select("name city cuisine").sort('name')
    try {
        res.status(200).send(restaurant)
    } catch (e) {
        res.status(500).send(e)
    }


})

app.post("/posting", async (req, res) => {
    res.status(404).send("not found")
})


module.exports = app