const mongoose  = require('mongoose');
const ProdcutsSchema = mongoose.Schema({
    prodNo: {
        type: String,
        required: true,
        unique: true
    },
    prodName: {
        type: String,
        required: true
    },
    prodNameUnique: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', ProdcutsSchema);