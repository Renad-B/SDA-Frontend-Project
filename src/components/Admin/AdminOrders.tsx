import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from './AdminSidebar'
import { fetchOrders } from '../../redux/slices/orders/orderSlice'

import { AppDispatch, RootState } from '../../redux/store'

const AdminOrders = () => {
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
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h1> List of all Orders: </h1>
        <section className="orders">
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <article key={order.id} className="order">
                  <p>ID: {order.id}</p>
                  <p>Proudct ID:{order.productId}</p>
                  <p>Purchaes time:{order.purchasedAt}</p>
                  <p>User ID:{order.userId}</p>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default AdminOrders
