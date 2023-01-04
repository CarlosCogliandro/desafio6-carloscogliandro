
let express = require("express");
let app = express();
const PORT = process.env.PORT || 8080;
let serverRoutes = require('./src/routes');

// Socket
let {Server: HttpServer} = require("http");
// let Socket = require("./src/utils/sockets");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Engine
app.set("views", "./src/views");
app.set("view engine", "ejs");


serverRoutes(app);


let httpServer = new HttpServer(app);

// let io = new Socket(httpServer);
// io.init();

const connectedServer = httpServer.listen(PORT, ()=> console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));
connectedServer.on('Error al conectar ----->', (error) => {console.log(error)});