const mongoose  = require('mongoose');

const ProdcutsSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    FName:{
        type: String,
        required: true
    },
    LName:{
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        unique: false,
        required: false,
    },
    storedPassword:{
        type: String,
        required: true,
        min: 8
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', ProdcutsSchema);