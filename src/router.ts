import {Router } from 'express'
import { createProduct, getProducts,getProductByID, updateProduct,updateAvailability, deleteProduct} from './handlers/product'
import { body,param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                    id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                    name:
 *                      type: integer
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 pulgadas
 * 
 *                    price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                    availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *         summary: Get a list of products
 *         tags:
 *              - Products
 *         description: Return a list of products
 *         responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */



//Routing
router.get('/',
    getProducts)

    /** 
     * @swagger
     * /api/products/{id}:
     *  get:
     *      summary: Get a product by ID
     *      tags:
     *          - Products
     *      description: Return a product based on its unique ID
     *      parameters:
     *        - in: path
     *          name: id
     *          descritpion: The ID of the product of retrieve
     *          required: true
     *          schema:
     *              type: integer
     *      responses:
     *          200:
     *              description: Successful Response
     *              content:
     *                  application/json:
     *                      schema:
     *                           $ref: '#/components/schemas/Product'
     *          404:
     *              description: Not found
     *          400:
     *              description: Bad request invalid ID
     * 
     */

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductByID)


    /**
     * @swagger
     * /api/products:
     *  post:
     *      summary: Create a new Product
     *      tags:
     *          - Products
     *      description: Returns a new record in the database
     *      requestBody:
     *          required: true
     *          content: 
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          name:
     *                              type: string
     *                              example: 'Monitor curvo 49 pulgadas'
     *                          price:
     *                               type: number
     *                               example: 399
     *      responses:
     *           201:
     *              description: Product created successfully
     *           400:
     *              description: Bad request invalid input data
     * 
     */
router.post('/',
    //Validaciones.
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio.'),
  body('price').isNumeric().withMessage('Valor no valido')
  .custom(value => value > 0).withMessage('Valor no valido.')
  .notEmpty().withMessage('El precio del producto no puede ir vacio.'),
   handleInputErrors,
  createProduct)
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Return the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          descritpion: The ID of the product of retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor curvo 49 pulgadas'
 *                          price:
 *                               type: number
 *                               example: 399
 *                          availability:
 *                               type: boolean
 *                               example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 *          404:
 *              description: Product not found
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price').isNumeric().withMessage('valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct )
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          descritpion: The ID of the product of retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *              description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a selected product
 *      tags:
 *          - Products
 *      description: Delete a selected Product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product deleted
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *              description: Product not found
 * 
 * 
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router