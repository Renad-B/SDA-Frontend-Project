import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserSidebar from './UserSidebar'
import { AppDispatch, RootState } from '../../redux/store'

import { fetchOrders } from '../../redux/slices/orders/orderSlice'

const UserOrders = () => {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderReducer)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  if (isLoading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  console.log(orders)
  return (
    <div className="container">
      <UserSidebar />
      <div className="main-content">
        <h1> List of all Orders: </h1>
        <section className="orders">
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <article key={order._id} className="order">
                  <p>ID: {order._id}</p>
                  <p>Proudct ID:{order.product}</p>
                  <p> Shipping Addres:{order.shippingAddress}</p>
                  <p> Shipping status:{order.status}</p>
                  <p> Shipping Total Amount:{order.totalAmount}</p>
                  <p> Quantity:{order.quantity}</p>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default UserOrders
