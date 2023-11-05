import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { sortProducts } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    dispatch(sortProducts(value))
  }
  return (
    <div className="sort-by-container">
      <label className="sort-label"> Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="price" defaultValue="price">
          Price
        </option>
        <option value="category">Category</option>
      </select>
    </div>
  )
}
export default SortProducts
