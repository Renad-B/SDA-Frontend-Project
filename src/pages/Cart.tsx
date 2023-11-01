import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { removeFromCart } from '../redux/slices/Cart/cartSlice'

export const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const dispatch: AppDispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }
  //error in the console about the keys
  return (
    <div className="cart">
      <h5>You have {cartItems.length > 0 ? cartItems.length : 0} items in the cart </h5>
      <div className="cart-main">
        {cartItems.length > 0 && (
          <>
            <div className="cart-items">
              {cartItems.map((cartItem) => {
                return (
                  <article key={cartItem.id} className="products">
                    <div className="product">
                      <img src={cartItem.image} alt={cartItem.name} />
                    </div>
                    <div className="product">
                      <h5>Name: {cartItem.name}</h5>
                      <p>Description: {cartItem.description}</p>
                      <h6>Price: {cartItem.price}</h6>
                      <button
                        onClick={() => {
                          handleRemove(cartItem.id)
                        }}>
                        Delete
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Cart
