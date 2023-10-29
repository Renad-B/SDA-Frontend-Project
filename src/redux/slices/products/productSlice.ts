import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('Products/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.error('Error', error)
  }
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
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
      const id = action.payload
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
export const { findProductById, searchProduct, sortProducts } = productSlice.actions
export default productSlice.reducer
