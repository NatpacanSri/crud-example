const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stdID: String,
    name: String,
    gender: String,
    age: Number,
    adviser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Student', studentSchema);