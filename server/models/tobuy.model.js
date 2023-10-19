const mongoose = require('mongoose');


const toBuySchema = new mongoose.Schema({
    titulo: {
        type: String
    },
    comprado: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
});

const ToBuy= mongoose.model('ToBuy', toBuySchema);

module.exports = ToBuy;