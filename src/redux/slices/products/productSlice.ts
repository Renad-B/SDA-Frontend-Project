import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../../api'
import axios from 'axios'
import { setSingleProduct, updateProduct } from '../../../services/ProductService'

const baseURLProduct = 'http://localhost:3002/api'

export const fetchProducts = createAsyncThunk('Products/fetchProducts', async () => {
  try {
    // const response = await api.get('/mock/e-commerce/products.json')
    const response = await axios.get(`${baseURLProduct}/products`)
    console.log('Fetched Products:', response.data.payload)
    return response.data.payload.products
  } catch (error) {
    throw new Error('cant reash products')
  }
})

export type Product = {
  _id: string
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  sold: number
  shipping: number
  description: string
  createdAt?: string
  updatedAt?: string
  categoryId: string
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product | null
  searchTerm: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  singleProduct: null as Product | null,
  searchTerm: ''
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    findBySlug: (state, action) => {
      const { slug } = action.payload
      const foundSingleProduct = state.products.find((product) => product.slug === slug)
      if (foundSingleProduct) {
        state.singleProduct = foundSingleProduct
      }
    },
    sortProducts: (state, action) => {
      const sorting = action.payload
      console.log(sorting)
      if (sorting === 'category') {
        state.products.sort((a, b) => a.categoryId[0] - b.categoryId[0])
      } else if (sorting === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred'
      })
      .addCase(setSingleProduct, (state, action) => {
        state.singleProduct = action.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { name, slug } = action.payload
        const foundSingleProduct = state.products.find((product) => product.slug === slug)
        if (foundSingleProduct) {
          foundSingleProduct.name = name
        }
      })
  }
})
export const { searchProduct, addProduct, findBySlug, sortProducts } = productSlice.actions
export default productSlice.reducer
