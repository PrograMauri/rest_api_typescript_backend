import {Request,Response} from 'express'
import Product from '../models/Product'


export const getProducts = async(req,res) =>{
try {
  const product = await Product.findAll({
    order:[
      ['id','DESC']
    ]
  })
  res.json({data: product})
} catch (error) {
  console.log(error)
}
}

export const getProductByID = async(req:Request,res:Response) =>{
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    
    if(!product){
      res.status(404).json({
      error:'Producto no encontrdo.'
     })
    }
  
    res.json({data: product})
    
  } catch (error) {
    console.log(error)
  }


  }

export const createProduct = async (req : Request,res : Response) =>{
try {
  const product = await Product.create(req.body)
  res.status(201).json({data: product}) //De esta manera nos va a aparecer la informacion del producto q estamos enviando a la base de datos.
} catch (error) {
  console.log(error)
}
}

export const updateProduct = async (req:Request,res:Response) =>{
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    
    if(!product){
      res.status(404).json({
      error:'Producto no encontrdo.'
     })
    }
    //Actualizamos el producto
    await product.update(req.body)
    await product.save()

    res.json({data: product})
    
  } catch (error) {
    console.log(error)
  }
}


export const updateAvailability = async (req:Request,res:Response) =>{
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    
    if(!product){
      res.status(404).json({
      error:'Producto no encontrdo.'
     })
    }
    //Actualizamos el producto
    product.availability= !product.dataValues.availability
    await product.save()
    
    res.json({data: product})
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (req:Request,res:Response) =>{
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    
    if(!product){
      res.status(404).json({
      error:'Producto no encontrdo.'
     })
    }
    await product.destroy() 
    res.json({data: 'Producto eliminado'})
  } catch (error) {
    console.log(error)
  }
}

