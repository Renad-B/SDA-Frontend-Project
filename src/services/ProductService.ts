import axios from 'axios'
import { AppDispatch } from '../redux/store'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../redux/slices/products/productSlice'

const baseURLProduct = 'http://localhost:3002/api'

export const deleteProductBySlug = async (slug: string | undefined) => {
  try {
    const response = await axios.delete(`${baseURLProduct}/products/${slug}`)
    console.log(response.data)
    return response.data.payload
  } catch (error) {
    console.log(error)
  }
}

export const setSingleProduct = createAction<Product>('products/setSingleProduct')

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct) => {
  try {
    const response = await axios.post(`${baseURLProduct}/products`, newProduct, {
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log(response.data.payload)
    return response.data.payload.payload
  } catch (error) {
    console.error('Type of error', error)
    throw Error('Cannot create the product')
  }
})

//get single product by slug in show details
export const getProductBySlug = async (slug: string | undefined, dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${baseURLProduct}/products/${slug}`)
    console.log(response.data)
    dispatch(setSingleProduct(response.data.payload))
    // return response.data.payload
  } catch (error) {
    console.log(error)
  }
}

//todo
//update single product
