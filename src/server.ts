import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec,{swwaggerUiOptions} from "./config/swagger";
import cors,{CorsOptions} from 'cors'
import morgan from 'morgan'


//Conectar base de datos.
 export async function connectDB(){
    try {
   await db.authenticate()
    db.sync() 
   // console.log('Conexion exitosa con la base de datos.')
    } catch (error) {
         console.log('Hubo un error al conectar la DB')
    }
}
connectDB()
//Instancia de express.
const server = express()

//Conexiones

const corsOptions : CorsOptions = {
     origin: function(origin,callback){
          if(origin === process.env.FRONTEND_URL){
               callback(null,true)
          }else{
               callback(new Error('Error de cors.'))
          }
     }
}

server.use(cors(corsOptions))

//Para q pueda leer los archivos json.
server.use(express.json())

server.use('/api/products',router)
server.use(morgan('dev'))
//Docs
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swwaggerUiOptions))

export default server


