const FavController = require("../controllers/fav.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {

    app.post('/api/fav/guardar', authenticate, FavController.guardarFav);

    app.get('/api/fav', authenticate, FavController.buscarFavs);

    app.get('/api/fav/:id', authenticate, FavController.buscarFav); 

    app.put('/api/fav/:id', authenticate, FavController.actualizarFav);

    app.delete('/api/fav/:id', authenticate, FavController.borrarFav);
} 