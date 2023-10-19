const WishController = require("../controllers/wish.controller");
const {authenticate} = require("../config/jwt.config");


module.exports = app => {

    app.post('/api/wish/guardar', authenticate, WishController.guardarWish);

    app.get('/api/wishs', authenticate, WishController.buscarWishs);

    app.get('/api/wish/:id', authenticate, WishController.buscarWish); 

    app.put('/api/wish/:id', authenticate, WishController.actualizarWish);

    app.delete('/api/wish/:id', authenticate, WishController.borrarWish)
}