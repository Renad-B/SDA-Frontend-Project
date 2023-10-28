import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { sortProducts } from '../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div>
      <label> Sort by:</label>
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
