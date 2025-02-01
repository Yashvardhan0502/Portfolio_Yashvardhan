const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend to access backend
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/Contact', async (req, res) =>{
    try{
        const {name, email, subject, message} = req.body;
        console.log("Received data:", req.body);  // Log the received data to console


        // saving to db
        const newContact = new Contact({name, email, subject, message});
        await newContact.save();

        res.status(201).json({message: "Conatct saved succesfully"});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "An error has occured while saving the contact"});
        
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
