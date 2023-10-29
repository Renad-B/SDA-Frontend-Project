import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.error('Error', error)
    throw error // Re-throw the error to be caught by the component
  }
})

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
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
      localStorage.setItem('userData', JSON.stringify(state))
    },
    deleteUser: (state, action) => {
      const filterUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filterUsers
    },
    banUser: (state, action) => {
      const id = action.payload
      const findUser = state.users.find((user) => user.id === id)
      if (findUser) {
        findUser.ban = !findUser.ban
      }
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
  }
})

export const { login, logout, deleteUser, banUser, addUser } = userSlice.actions
export default userSlice.reducer
