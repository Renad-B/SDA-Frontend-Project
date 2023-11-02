import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './Admin/AdminSidebar'
import { AppDispatch, RootState } from '../redux/store'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from '../redux/slices/products/productSlice'

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const [productName, setProductName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProudctId] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }
  const handleDelete = (id: number) => {
    console.log(id)
    dispatch(deleteProduct(id))
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value)
  }
  const handleEditing = (id: number, name: string) => {
    setProudctId(id)
    setIsEditing(!isEditing)
    setProductName(name)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isEditing) {
      const newProdcut = { id: new Date().getTime(), name: productName }
      dispatch(addProduct(newProdcut))
    } else {
      const updateCategoryData = { id: productId, name: productName }
      dispatch(updateProduct(updateCategoryData))
    }
    setProductName('')
  }
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-product">
        <br />
        <h4>Create a product</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            value={productName}
            placeholder="Add product name .."
            onChange={handleChange}
          />
          <button>{isEditing ? 'Update' : 'Add'}</button>
        </form>
        <br />
        <h4>List of Prodcts </h4>
        <br />
        <section className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <article key={product.id} className="product">
                  <img src={product.image} alt="product-img" />
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <button
                    onClick={() => {
                      handleDelete(product.id)
                    }}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEditing(product.id, product.name)
                    }}>
                    Edit
                  </button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Products
