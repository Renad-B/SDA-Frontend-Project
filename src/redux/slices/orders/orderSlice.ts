import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { Product } from '../products/productSlice'
import { User } from '../users/userSlice'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const { data } = await api.get('http://localhost:3002/api/orders')
    return data.payload
  } catch (error) {
    console.error("Error can't fetch orders.", error)
  }
})

export type Order = {
  _id: string
  userId: User['_id']
  //what to do here?
  // orderItems: IItemes[]
  product: Product['_id']
  quantity: number
  totalAmount: number
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled'
  shippingAddress: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error cant fetch orders'
      })
  }
})
export default orderSlice.reducer
