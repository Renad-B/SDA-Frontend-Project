import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../../api'
import axios from 'axios'

export const baseURL = 'http://localhost:3002/api'

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    console.log(response.data.payload.users)
    return response.data.payload.users
  } catch (error) {
    console.error('Error', error)
    throw error
  }
})

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`)
    console.log(response.data.payload.users)
    return response.data
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export const banUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/${id}`)
    console.log(response.data.payload.users)
    return response.data
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}
export const unbanUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/${id}`)
    console.log(response.data.payload.users)
    return response.data
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export type User = {
  _id: string
  name: string
  email: string
  image: string
  password: string
  address: string
  phone: string
  isAdmin: string
  isBanned: boolean
  searchTerm: ''
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  ban: boolean
  searchTerm: ''
}

//set the data in local storge using JSON
const savedUserData = localStorage.getItem('userData')
const userData = savedUserData ? JSON.parse(savedUserData) : null

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: userData?.isLoggedIn ?? false,
  userData: userData?.userData ?? null,
  ban: false,
  searchTerm: ''
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(state))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      // localStorage.setItem('userData', JSON.stringify(state))
      localStorage.removeItem('userData')
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
      // Filter users based on the search term
      state.users = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, firstName } = action.payload
      const findUser = state.users.find((user) => user._id === id)
      if (findUser) {
        findUser.name = firstName
        state.userData = findUser
        localStorage.setItem('userData', JSON.stringify(state))
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred'
      })
  }
})

export const { login, logout, addUser, updateUser, searchUser } = userSlice.actions
export default userSlice.reducer
