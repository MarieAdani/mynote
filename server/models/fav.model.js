const mongoose = require('mongoose');


const favSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
    elementoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'El campo elementoId es obligatorio.'],
    },
    tipoElemento: {
        type: String,
        required: [true, 'El campo tipoElemento es obligatorio.'],
        enum: ['To Do List', 'To Buy List', 'Wish List', 'Moodboard'],
    },
}, { timestamps: true });

const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;