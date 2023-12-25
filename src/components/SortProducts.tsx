import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { sortProducts } from '../redux/slices/products/productSlice'

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
        <option value="name">name</option>
      </select>
    </div>
  )
}
export default SortProducts
