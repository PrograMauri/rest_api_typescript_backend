import request from 'supertest'
import server from '../../server'

describe('POST /api/products',() =>{
    it('should display validation errors',async() =>{
        const response = await request(server).post('/api/products').send({}) //lo envío vacío, de esa forma simulo que estoy enviando el formulario sin llenar nada.
        expect(response.status).toBe(400) // O sea una bad request, una peticion mala.
        expect(response.body).toHaveProperty('errors')// Es decir que estamos esperando errores. Porque estamos validando.
        expect(response.body.errors).toHaveLength(4) // Es decir que tengo q tener 4 mensajes de errores. 
    })
    it('should validate that the price is greater than 0',async() =>{
        const response = await request(server).post('/api/products').send({
            name:"Monitor Curvo",
            price:0
        }) //lo envío vacío, de esa forma simulo que estoy enviando el formulario sin llenar nada.
        expect(response.status).toBe(400) // O sea una bad request, una peticion mala.
        expect(response.body).toHaveProperty('errors')// Es decir que estamos esperando errores. Porque estamos validando.
        expect(response.body.errors).toHaveLength(1) // Es decir que tengo q tener 4 mensajes de errores. 

    })
    it('should validate that the price is a number and greater than 0',async() =>{
        const response = await request(server).post('/api/products').send({
            name:"Monitor Curvo",
            price:"hola"
        }) //lo envío vacío, de esa forma simulo que estoy enviando el formulario sin llenar nada.
        expect(response.status).toBe(400) // O sea una bad request, una peticion mala.
        expect(response.body).toHaveProperty('errors')// Es decir que estamos esperando errores. Porque estamos validando.
        expect(response.body.errors).toHaveLength(2) // Es decir que tengo q tener 4 mensajes de errores. 

    })
    it('should create a product', async () =>{
        const response = await request(server).post('/api/products').send({
            name:"Mouse - Testing",
            price:50
          })
          expect(response.status).toBe(201)
          expect(response.body).toHaveProperty('data')
          //Contraparte
          expect(response.status).not.toBe(404)
          expect(response.status).not.toBe(400)
          expect(response.status).not.toBe(200)
          expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products',() =>{
    it('should check if api/products/url exists',async ()=>{
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    it('Get a JSON RESPONSE with products',async () =>{
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body.data).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
})
describe('GET /api/products/:id',() =>{
    it('Should return a 404 response for a non-existent product',async () =>{
        //Primero vamos a validar que el producto no exista.

        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrdo.')
    })
    it('Should check a valid ID in the url',async () =>{
        const response = await request(server).get('/api/products/error-invalid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })
    it('GET a json response for a single product',async () =>{
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
}) 

describe('PUT /api/products/:id',() =>{
    it('Should check a valid ID in the url',async () =>{
        const response = await request(server).put('/api/products/error-invalid-id').send({
            name:"Monitor curvo",
            availability:true,
            price:0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })
    it('should display validation error messages when updating a product',async()=>{
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)


        //Contra Parte

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should validate that the price is grater than 0',async()=>{
        const response = await request(server).put('/api/products/1').send({
            name:"Monitor curvo",
            availability:true,
            price:0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')

        //Contra Parte

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
 
    it('should return 404 response for a non-existen product',async()=>{
        const productId= 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name:"Monitor curvo",
            availability:true,
            price:300
        })
        //¿Que es lo que esperamos?  
        //Obviamente un producto que no exista, por lo tanto...
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrdo.')
        //Contra Parte
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should update an existing product with valid data',async()=>{
        const response = await request(server).put(`/api/products/1`).send({
            name:"Monitor curvo",
            availability:true,
            price:300
        })
        //¿Que es lo que esperamos?  
        //Obviamente un producto que no exista, por lo tanto...
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        //Contra Parte
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')

    })
})


describe('DELETE /api/products/:id',()=>{
it('should be a valid product for deleted',async () =>{
    const response = await request(server).delete('/api/products/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
})


it('Should check a valid ID in the url',async () =>{
    const response = await request(server).delete(`/api/products/not-valid-url`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')

    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(201)
})
it('should return a 404 response for a non-existent product',async () =>{
    const productId = 3000
    const response = await request(server).delete(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
})
})


describe('PATCH /api/products/:id',() =>{
    it('should return a 404 error for a non existent product',async()=>{
        const productId=3000
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should return a error for url-non-existen',async()=>{
        const response = await request(server).patch(`/api/products/url-non-existen`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('data')
    })

    
})