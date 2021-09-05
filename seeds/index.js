const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;



db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// pass in the array and return a random element in that array
const sample = array => array[Math.floor(Math.random() * array.length)];

// first this erases the db's objects
// Then it will randomly pick 50 cities to add to the db
// it's so much you have to type "it" in mongo to see more
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6129ba91a7e3285904c127e5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/kakashi9104/image/upload/v1630482122/Yelpcamp/yx0voiim13ejbb1cf17d.jpg',
                    filename: 'Yelpcamp/yx0voiim13ejbb1cf17d'
                },
                {
                    url: 'https://res.cloudinary.com/kakashi9104/image/upload/v1630479402/Yelpcamp/pikgveenoug1svoctvdo.jpg',
                    filename: 'Yelpcamp/pikgveenoug1svoctvdo.jpg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum temporibus nesciunt doloribus exercitationem tenetur quasi hic at amet. Minus unde, ullam eos voluptate facere nostrum veritatis officia eveniet inventore quae!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})