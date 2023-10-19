const Ciclo = require("../models/ciclo.model");

const guardarCiclo = (req, res) => {
    Ciclo.create(req.body)
        .then(ciclo => res.json(ciclo))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarCiclos = (req, res) =>{
    Ciclo.find().sort({ fechaCreacion: 1 })
        .then(ciclos => res.json(ciclos))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarCiclo = (req, res) => {
    Ciclo.findOne({_id: req.params.id})
        .then(ciclo => res.json(ciclo))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarCiclo = (req, res) => {
    Ciclo.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(ciclo => res.json(ciclo))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarCiclo = (req, res) =>{
    Ciclo.deleteOne({_id: req.params.id})
        .then(ciclo => res.json(ciclo))
        .catch(err => {
            res.status(400).json(err);
        })
}



module.exports = {
    guardarCiclo,
    buscarCiclos,
    buscarCiclo,
    actualizarCiclo,
    borrarCiclo
}