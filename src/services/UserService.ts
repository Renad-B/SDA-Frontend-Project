import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { fetchUser } from '../redux/slices/users/userSlice'

export const baseURL = 'http://localhost:3002/api'

export const createUser = createAsyncThunk('users/createUser', async (newUser: FormData) => {
  try {
    const response = await axios.post(`${baseURL}/users/register`, newUser)
    console.log(response.data.payload.users)
    return response.data.payload.users
  } catch (error) {
    throw new Error('Failed to register user')
  }
})

export const activateUserAccount = createAsyncThunk(
  'users/activateUserAccount',
  async (token: string) => {
    try {
      const response = await axios.post(`${baseURL}/users/activate`, { token })
      // console.log(response.data.payload.users)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to activate user')
    }
  }
)

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`)
    console.log(response.data.payload.users)
    return response.data
  } catch (error) {
    throw new Error('Falied to delete user')
  }
}

export const banUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/ban/${id}`)
    fetchUser()
    return response.data
  } catch (error) {
    throw new Error('Falied to band user')
  }
}

export const unbanUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/unban/${id}`)
    fetchUser()
    return response.data
  } catch (error) {
    throw new Error('Falied to unband user')
  }
}

export const loginUser = createAsyncThunk('user/loginUser', async (user: object) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, user)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})
