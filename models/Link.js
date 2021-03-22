const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Link = mongoose.model('link', linkSchema);

module.exports = Link;