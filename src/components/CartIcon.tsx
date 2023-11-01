import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <AiOutlineShoppingCart />
      <span className="icon">{value}</span>
    </div>
  )
}
export default CartIcon
