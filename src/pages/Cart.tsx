import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { deleteAll, removeFromCart } from '../redux/slices/Cart/cartSlice'

export const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const dispatch: AppDispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({})

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity
    }))
  }
  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity
  }
  const calculateTotal = () => {
    let total = 0
    cartItems.forEach((item) => {
      const quantity = quantities[item.id] || 1
      const subtotal = calculateSubtotal(item.price, quantity)
      total += subtotal
    })
    return total
  }
  const DeleteAll = () => {
    dispatch(deleteAll())
  }

  return (
    <div className="cart">
      <h5>You have {cartItems.length > 0 ? cartItems.length : 0} items in the cart</h5>
      <div className="cart-main">
        {cartItems.length > 0 && (
          <>
            <button onClick={DeleteAll}>Delete All</button>
            <div className="cart-items">
              {cartItems.map((cartItem, index) => (
                <article key={`${cartItem.id}-${index}`} className="products">
                  <div className="product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <h5>Name: {cartItem.name}</h5>
                    <p>Description: {cartItem.description.substring(0, 20)}...</p>
                    <h6>Price: {cartItem.price}$</h6>
                    <div>
                      Quantity:
                      <input
                        type="number"
                        min={1}
                        value={quantities[cartItem.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(cartItem.id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <p>
                      Subtotal: {calculateSubtotal(cartItem.price, quantities[cartItem.id] || 1)}$
                    </p>
                    <button onClick={() => handleRemove(cartItem.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="checkout">
              CheckOut info
              <h5>Total: {calculateTotal()}$</h5>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
