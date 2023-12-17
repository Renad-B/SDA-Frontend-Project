import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../../api'
import axios from 'axios'
import { Category } from '../categories/categorySlice'

const baseURLProduct = 'http://localhost:3002/api'
//what will happen ?
export const fetchProducts = createAsyncThunk('Products/fetchProducts', async () => {
  try {
    // const response = await api.get('/mock/e-commerce/products.json')
    const response = await axios.get(`${baseURLProduct}/products`)
    console.log('Fetched Products:', response.data.payload)
    return response.data.payload.products
  } catch (error) {
    console.error('Error', error)
  }
})

export type Product = {
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
  categoryId: Category['_id']
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
    findProductById: (state, action) => {
      const { id } = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'category') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') state.products.sort((a, b) => a.price - b.price)
    },
    deleteProduct: (state, action) => {
      const filterCategory = state.products.filter((category) => category.id !== action.payload)
      state.products = filterCategory
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const { id, name } = action.payload
      const findProduct = state.products.find((product) => product.id === id)
      if (findProduct) {
        findProduct.name = name
        // findProduct.description = description
        // findProduct.categories = categories
      }
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
  }
})
export const {
  findProductById,
  searchProduct,
  sortProducts,
  deleteProduct,
  addProduct,
  updateProduct
} = productSlice.actions
export default productSlice.reducer
