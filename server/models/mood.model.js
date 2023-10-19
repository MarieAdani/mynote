const mongoose = require('mongoose');


const moodSchema = new mongoose.Schema({
    imagen: String,
    moodValue: {
        type: String,
        enum: ['Feliz', 'Triste', 'Enojado', 'Calmado', 'Emocionado', 'Neutro'],
        required: true,
    }, 
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
}, { timestamps: true });

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;