const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    reason: { type: String, required: true },
    timing: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
