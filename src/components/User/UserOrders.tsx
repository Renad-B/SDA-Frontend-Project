import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import UserSidebar from './UserSidebar'
import { fetchOrders } from '../../redux/slices/orders/orderSlice'
import { useEffect } from 'react'
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

export default UserOrders
