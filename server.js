const express = require("express");
const app = express();
//
const cookieParser = require ("cookie-parser");

const cors = require("cors");

app.use(express.json(), express.urlencoded({ extended: true }));

//para usar cookies
app.use(cookieParser())


app.use(
    cors({
        origin: "http://localhost:3000",
        //credenciales
        credentials: true
    })
);

require("./server/config/mongoose.config");

// 
const userRoutes = require("./server/routes/user.route");
const todoRoutes = require("./server/routes/todo.route"); 
const tobuyRoutes = require("./server/routes/tobuy.route"); 
const wishRoutes = require("./server/routes/wish.route"); 
const moodRoutes = require("./server/routes/mood.route"); 
const cicloRoutes = require("./server/routes/ciclo.route"); 
const favRoutes = require("./server/routes/fav.route"); 


// 
userRoutes(app);
todoRoutes(app); 
tobuyRoutes(app);
wishRoutes(app);
moodRoutes(app);
cicloRoutes(app);
favRoutes(app);

app.listen(8000, () => console.log("Servidor listo !"));