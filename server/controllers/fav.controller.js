const Fav = require("../models/fav.model");

const guardarFav = (req, res) => {
    Fav.create(req.body)
        .then(fav => res.json(fav))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarFavs = (req, res) =>{
    Fav.find().sort({ fechaCreacion: -1 })
        .then(favs => res.json(favs))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarFav = (req, res) => {
    Fav.findOne({_id: req.params.id})
        .then(fav => res.json(fav))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarFav = (req, res) => {
    Fav.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(fav => res.json(fav))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarFav = (req, res) =>{
    Fav.deleteOne({_id: req.params.id})
        .then(fav => res.json(fav))
        .catch(err => {
            res.status(400).json(err);
        })
}



module.exports = {
    guardarFav,
    buscarFavs,
    buscarFav,
    actualizarFav,
    borrarFav
}