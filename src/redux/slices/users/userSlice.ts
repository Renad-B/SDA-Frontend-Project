import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../../api'
import axios from 'axios'

const baseURL = 'http://localhost:3002/api'

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    console.log(response.data.payload.users)
    return response.data.payload.users
  } catch (error) {
    console.error('Error', error)
    throw error // Re-throw the error to be caught by the component
  }
})

export type User = {
  _id: number
  name: string
  email: string
  image: string
  password: string
  address: string
  phone: string
  isAdmin: string
  isBanned: boolean
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  ban: boolean
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
  ban: false
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
    deleteUser: (state, action) => {
      const filterUsers = state.users.filter((user) => user._id !== action.payload)
      state.users = filterUsers
    },
    banUser: (state, action) => {
      const id = action.payload
      const findUser = state.users.find((user) => user._id === id)
      if (findUser) {
        findUser.isBanned = !findUser.isBanned
      }
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

export const { login, logout, deleteUser, banUser, addUser, updateUser } = userSlice.actions
export default userSlice.reducer
