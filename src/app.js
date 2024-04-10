import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import sessions from 'express-session';
import connectMongo from 'connect-mongo'

import indexRouter from './routers/views/index.router.js';
import productsRouter from './routers/views/products.router.js';
import { __dirname } from './utils.js';
import sessionRouter from './routers/views/sessions.router.js'

const app = express();

const SESSION_SECRET = '|7@3BBY5jH:@zFQIg_v47HkKP5S#p&Uc';
const URI = 'mongodb+srv://andrest911:M3gPtTin1bfuAeSR@cluster0.nakuen6.mongodb.net/cookies?retryWrites=true'


//estas líneas de código configuran la gestión de sesiones en una aplicación Express, utilizando MongoDB para almacenar información de sesión de usuarios
app.use(sessions({
  store: connectMongo.create({
    mongoUrl: URI,
    mongoOptions: {},
    //ttl = Tiempo de vida de la sesion (30 segundos)
    ttl: 60*10,
  }),
  // secret:  Este valor secreto se utiliza para evitar que se manipulen las cookies de sesión desde el lado del cliente y acceder a sesiones de otros usuarios
  secret: SESSION_SECRET,

  // Esta propiedad indica que la sesión se guardará de nuevo en el almacenamiento, incluso si no ha habido cambios durante la solicitud, lo que ayuda a evitar la pérdida de la sesión
  resave: true,

  // Esta propiedad indica que se deben almacenar sesiones aunque estén sin inicializar, lo que permite la creación de sesiones para cada visita de usuario incluso si no se realiza ninguna modificación en la sesión durante la visita
  saveUninitialized: true,
}));

//Permite a la aplicación Express comprender y trabajar con datos JSON en las solicitudes.
app.use(express.json());

//Permite a la aplicación Express entender y procesar datos enviados en formularios HTML
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use('/api',sessionRouter,productsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
