import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    console.error('Error', error)
  }
})

export type Category = {
  id: number
  name: string
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
      const filterCategory = state.categories.filter((category) => category.id !== action.payload)
      state.categories = filterCategory
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const findCategory = state.categories.find((category) => category.id === id)
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
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred'
      })
  }
})
export const { deleteCategory, addCategory, updateCategory } = categorySlice.actions
export default categorySlice.reducer
