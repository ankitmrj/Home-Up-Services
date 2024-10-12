require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like the HTML form)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Mongoose schema for appointment data
const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    reason: { type: String, required: true }
});

// Mongoose model
const Appointment = mongoose.model('Appointment', AppointmentSchema);

// API route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, mobile, address, city, state, appointmentDate, appointmentTime, reason } = req.body;

    const newAppointment = new Appointment({
        name,
        mobile,
        address,
        city,
        state,
        appointmentDate,
        appointmentTime,
        reason
    });

    newAppointment.save()
        .then(() => res.json({ success: true }))
        .catch(err => {
            console.error('Error saving appointment:', err);
            res.status(500).json({ success: false, message: 'Error saving data: ' + err.message });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
