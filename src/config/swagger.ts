import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2',
        tags:[
            {
                name:'Products',
                description:'API operations related for products'
            }
        ],
        info:{
            title:'REST API Node.js / Express / TypeScript',
            version:'1.0.0',
            description:'API Docs for Products'
        }
    },
    //apis es donde vamos a encontrar los endpoint que queremos documentar. Los endpoints que queremos documentar estan en router. Si es un proyecto muy grande, tendremos rutas de auth,usuarios,etc
    apis:['./src/router.ts'] //Hay q ponerle ./ para q sea en la base de mi proyecto.Si tuviera mas rutas y archivos le pongo una coma y sigo poniendole.
}

const swaggerSpec = swaggerJSDoc(options)

const swwaggerUiOptions :SwaggerUiOptions = {
    customCss:`
    .topbar-wrapper .link{
        content: url('URL DEL LOGO');
        height:120px;
        width:auto;
    }
    `
}
export default swaggerSpec
export{
    swwaggerUiOptions
}