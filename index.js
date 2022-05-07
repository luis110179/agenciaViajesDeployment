import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//conectar la base de datos
db.authenticate()
    .then( ()=> console.log('Base de datos conectada') )
    .catch( error =>console.log('error'))


//Definir puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;


//Habilitar Pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next)=>{
    const year = new Date();
    //locals es una variable que podemos pasar entre rutas
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes"
    next();
})

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended:true}))

//Definiar la carpeta publica
app.use(express.static('public'))

// Agregar Router
app.use('/', router);


app.listen(port,host,()=>{
    console.log(`el Servidor esta funcionando en el puerto ${port} y ${host}`)
})