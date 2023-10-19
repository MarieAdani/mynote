const ToBuyController = require("../controllers/tobuy.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {

    app.post('/api/tobuy/guardar', authenticate, ToBuyController.guardarToBuy);

    app.get('/api/tobuy', authenticate, ToBuyController.buscarToBuys);

    app.get('/api/tobuy/:id', authenticate, ToBuyController.buscarToBuy); 

    app.put('/api/tobuy/:id', authenticate, ToBuyController.actualizarToBuy);

    app.delete('/api/tobuy/:id', authenticate, ToBuyController.borrarToBuy);
}