import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import { dbConnection } from './src/database/config.js';

dotenv.config();


//*crear el server de express
const app = express();

//*base de datos
dbConnection()


//directorio publico
app.use(express.static('public'));


//lectura y parseo del body
app.use(express.json())
app.use(cors())



//*rutas
//rutas de usuarios(users)
app.use('/api/auth', authRoutes );
app.use('/api/events', eventRoutes)

//rutas de los eventos del calendario





//*escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('server running in port',process.env.PORT )
}) 