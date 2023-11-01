import { ChangeEvent, useEffect } from 'react'
import { Product, fetchProducts, searchProduct } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import SortProducts from '../components/SortProducts'
import SearchInput from '../components/SearchInput'

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    dispatch(searchProduct(searchTerm))
  }

  const filterProducts = searchTerm
    ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products
  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }
  return (
    <div>
      <section className="hero" id="hero">
        <h1>Technology Company</h1>
        <div className="contianer-home">
          <div className="sidebar">
            <h2>Filter by Price</h2>
            <h2>Filter by Category</h2>
          </div>
          <div className="main-content">
            <div className="actions">
              <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
              <SortProducts />
            </div>
            <h1>All product are listed here:</h1>
            <section>
              <div className="products">
                {filterProducts.length > 0 &&
                  filterProducts.map((product: Product) => {
                    return (
                      <article key={product.id} className="product">
                        <img src={product.image} alt="product img" />
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <h1>Price: {product.price} $</h1>
                        <button>Add to cart </button>
                        <Link to={`/products/${product.id}`}>
                          <button>Show details </button>
                        </Link>
                      </article>
                    )
                  })}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
