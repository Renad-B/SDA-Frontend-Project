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
  // if (isLoading) {
  //   return <p>Loading....</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }
  // const handleDelete = (slug: string) => {
  //   dispatch(deleteCategory(slug))
  // }

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value
  //   setCategoryName(value)
  // }

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault()
  //   if (!isEditing) {
  //     dispatch(createCategory(categoryName))
  //   } else {
  //     dispatch(updateCategory({ slug: categorySlug, name: categoryName }))
  //   }
  //   dispatch(fetchCategory()) // Refresh
  //   setCategoryName('')
  //   setIsEditing(false)
  // }

  // const handleEditing = (slug: string, name: string) => {
  //   setCategorySlug(slug)
  //   setIsEditing(!isEditing)
  //   setCategoryName(name)
  // }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h1> List of all Orders: </h1>
        <h2>Create Order :</h2>
        {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="order"
            value={orderName}
            placeholder="add order .."
            onChange={handleChange}
          /> */}
        <section className="orders">
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <article key={order._id} className="order">
                  {/* <p>ID: {order._id}</p> */}
                  <p>Proudct ID:{order._id}</p>
                  <p>Shipping Address:{order.shippingAddress}</p>
                  <p> Shipping status:{order.status}</p>
                  <p> Shipping Total Amount:{order.totalAmount}</p>
                  <p> Quantity:{order.quantity}</p>
                </article>
              )
            })}
        </section>
        <button className="btns">Create New Order</button>
        {/* <button
          onClick={() => {
            handleEditing(category.slug, category.name)
          }}>
          Edit
        </button> */}
        {/* <button
          onClick={() => {
            handleDelete(category.slug)
          }}>
          Delete
        </button> */}
      </div>
    </div>
  )
}

export default AdminOrders
