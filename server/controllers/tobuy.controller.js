const ToBuy = require("../models/tobuy.model");

const guardarToBuy = (req, res) => {
    ToBuy.create(req.body)
        .then(tobuy => res.json(tobuy))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarToBuys = (req, res) =>{
    ToBuy.find().sort({ fechaCreacion: -1 })
        .then(tobuys => res.json(tobuys))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarToBuy = (req, res) => {
    ToBuy.findOne({_id: req.params.id})
        .then(tobuy => res.json(tobuy))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarToBuy = (req, res) => {
    ToBuy.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(tobuy => res.json(tobuy))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarToBuy = (req, res) =>{
    ToBuy.deleteOne({_id: req.params.id})
        .then(tobuy => res.json(tobuy))
        .catch(err => {
            res.status(400).json(err);
        })
}


module.exports = {
    guardarToBuy,
    buscarToBuys,
    buscarToBuy,
    actualizarToBuy,
    borrarToBuy
}