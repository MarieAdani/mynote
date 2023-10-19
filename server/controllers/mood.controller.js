const Mood = require("../models/mood.model");

const guardarMood = (req, res) => {
    Mood.create(req.body)
        .then(mood => res.json(mood))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarMoods = (req, res) =>{
    Mood.find().sort({ fechaCreacion: -1 })
        .then(todos => res.json(todos))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarMood = (req, res) => {
    Mood.findOne({_id: req.params.id})
        .then(mood => res.json(mood))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarMood = (req, res) => {
    Mood.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(mood => res.json(mood))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarMood = (req, res) =>{
    Mood.deleteOne({_id: req.params.id})
        .then(mood => res.json(mood))
        .catch(err => {
            res.status(400).json(err);
        })
}



module.exports = {
    guardarMood,
    buscarMoods,
    buscarMood,
    actualizarMood,
    borrarMood
}