import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createCategory, deleteCategory, updateCategory } from '../../../services/CategoryServicea'

export const categorybaseURL = 'http://localhost:3002'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/categories')
    // const response = await axios.get(`${categorybaseURL}api/categories`)
    console.log('Fetch Category', response.data.payload)
    return response.data.payload
  } catch (error) {
    console.error('Error', error)
  }
})

export type Category = {
  _id: string
  name: string
  slug: string
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
  reducers: {},
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
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.slug !== action.payload)
        state.isLoading = false
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { name, slug } = action.payload
        const foundCategory = state.categories.find((category) => category.slug === slug)
        if (foundCategory) {
          foundCategory.name = name
        }
      })
  }
})

export default categorySlice.reducer
