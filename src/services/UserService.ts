import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.withCredentials = true
api.defaults.withCredentials = true

import { fetchUser } from '../redux/slices/users/userSlice'
import api from '../api'

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

// export const updateUser = createAsyncThunk('users/updateUser', async (userData: object) => {
//   try {
//     const response = await axios.put(`${baseURL}/users/${userData._id}`, userData)
//     return response
//   } catch (error) {
//     throw new Error('Failed to update user')
//   }
// })

export const activateUserAccount = createAsyncThunk(
  'users/activateUserAccount',
  async (token: string) => {
    try {
      const response = await axios.post(`${baseURL}/users/activate`, { token })
      // console.log(response.data.payload.users)
      return response.data.payload
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
    return response.data
  } catch (error) {
    throw new Error('Falied to login user')
  }
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error) {
    throw new Error('Falied to logout user')
  }
})
