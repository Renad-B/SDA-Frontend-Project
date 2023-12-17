import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import axios from 'axios'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  try {
    const response = await api.get('http://localhost:3002/api/categories')
    console.log('Fetch Category', response.data.payload)
    // Assuming the response structure is { message: 'all categories are returned', categories: [...] }
    const categories = response.data.payload

    return categories
    // return response.data
  } catch (error) {
    console.error('Error', error)
  }
})

export type Category = {
  _id: string
  name: string
  slug: string
  createdAt?: string
  updatedAt?: string
  __v: number
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      axios.delete(`http://localhost:3002/api/categories/${action.payload}`)
      window.location.reload()
      fetchCategory()
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const findCategory = state.categories.find((category) => category._id === id)
      if (findCategory) {
        findCategory.name = name
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred'
      })
  }
})
export const { deleteCategory, addCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
