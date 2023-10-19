const CicloController = require("../controllers/ciclo.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {

    app.post('/api/ciclo/guardar', authenticate, CicloController.guardarCiclo);

    app.get('/api/ciclo', authenticate, CicloController.buscarCiclos);

    app.get('/api/ciclo/:id', authenticate, CicloController.buscarCiclo); 

    app.put('/api/ciclo/:id', authenticate, CicloController.actualizarCiclo);

    app.delete('/api/ciclo/:id', authenticate, CicloController.borrarCiclo);
} 