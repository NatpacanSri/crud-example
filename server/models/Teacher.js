const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    tchID: String,
    name: String,
    gender: String,
    age: Number,
});

module.exports = mongoose.model('Teacher', teacherSchema);