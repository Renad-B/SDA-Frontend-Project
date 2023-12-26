import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//why still cant acess the cooki
axios.defaults.withCredentials = true

import { baseURL, loginUser, logoutUser, updateUser } from '../../../services/UserService'

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    console.log(response.data.payload.users)
    return response.data.payload.users
  } catch (error) {
    throw new Error('falied to fetch user')
  }
})

export type User = {
  _id: string
  name: string
  email: string
  image: string
  password: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
  searchTerm: ''
  token: string
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
    searchUser: (state, action) => {
      state.searchTerm = action.payload
      // Filter users based on the search term
      state.users = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload.payload
        localStorage.setItem(
          'login',
          JSON.stringify({
            isLogin: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // console.log(action.payload)
        state.isLoggedIn = false
        state.userData = null
        localStorage.setItem(
          'login',
          JSON.stringify({
            isLogin: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.userData) {
          state.userData.name = action.payload?.name
          localStorage.setItem(
            'login',
            JSON.stringify({
              isLogin: state.isLoggedIn,
              userData: state.userData
            })
          )
        }
      })
  }
})

export const { addUser, searchUser } = userSlice.actions
export default userSlice.reducer
