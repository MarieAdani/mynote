const MoodController = require("../controllers/mood.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {

    app.post('/api/mood/guardar', authenticate, MoodController.guardarMood);

    app.get('/api/mood', authenticate, MoodController.buscarMoods);

    app.get('/api/mood/:id', authenticate, MoodController.buscarMood); 

    app.put('/api/mood/:id', authenticate, MoodController.actualizarMood);

    app.delete('/api/mood/:id', authenticate, MoodController.borrarMood);
} 