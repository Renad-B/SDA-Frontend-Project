import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './Admin/AdminSidebar'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { fetchProducts } from '../redux/slices/products/productSlice'

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsR)

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

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h2>Create a product</h2>
        <h2>List of Proudects/Form </h2>
        <section className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <article key={product.id} className="product">
                  <img src={product.image} alt="product img" />
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <button>Delete</button>
                  <button>Edit</button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Products
