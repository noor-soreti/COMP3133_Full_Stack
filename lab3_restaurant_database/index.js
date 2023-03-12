const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js');

const PORT = 5000
const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://sa:TXEt5Ngiu7WVcU9P@cluster0.r8uhczt.mongodb.net/restaurant?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
  console.log(err);
});



app.use(restaurantRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
