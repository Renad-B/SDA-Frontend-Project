import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Category, categorybaseURL } from '../redux/slices/categories/categorySlice'

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (slug: string) => {
  try {
    await axios.delete(`${categorybaseURL}/api/categories/${slug}`)
    return slug
  } catch (error) {
    throw new Error(`Failed to delete category`)
  }
})

export const createCategory = createAsyncThunk('category/createCategory', async (name: string) => {
  try {
    const response = await axios.post(`${categorybaseURL}/api/categories/`, { name: name })
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error(`Failed to create category`)
  }
})

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (categoryData: Partial<Category>) => {
    try {
      await axios.put(`${categorybaseURL}/api/categories/${categoryData.slug}`, {
        name: categoryData.name
      })
      return categoryData
    } catch (error) {
      throw new Error(`Failed to update category`)
    }
  }
)
