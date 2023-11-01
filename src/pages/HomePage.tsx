import { ChangeEvent, useEffect, useState } from 'react'
import { Product, fetchProducts, searchProduct } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import SortProducts from '../components/SortProducts'
import SearchInput from '../components/SearchInput'
import { fetchCategory } from '../redux/slices/categories/categorySlice'
import { addToCart } from '../redux/slices/Cart/cartSlice'

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const [selectedCategory, setSelectedCategory] = useState<number[]>([])

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    console.log('Search term:', searchTerm)
    dispatch(searchProduct(searchTerm))
  }
  const handleSelected = (categoryId: number) => {
    if (selectedCategory.includes(categoryId)) {
      //remove
      const filterdCategory = selectedCategory.filter((category) => category !== categoryId)
      setSelectedCategory(filterdCategory)
    } else {
      setSelectedCategory((prevState) => {
        return [...prevState, categoryId]
      })
    }
  }

  const filterProducts: Product[] = products.filter((product: Product) => {
    const categoryMatch: boolean =
      selectedCategory.length === 0 ||
      selectedCategory.some((id: number) => product.categories.includes(id))

    const searchMatch: boolean =
      searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())

    return categoryMatch && searchMatch
  })

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }

  const handleAddToCart = (product: Product) => {
    console.log(product)
    //add to cart
    dispatch(addToCart(product))
    //remove from cart
  }

  return (
    <div>
      <section className="hero" id="hero">
        <h1>Technology Company</h1>
        <div className="contianer-home">
          <div className="sidebar">
            <h2>Filter by Category</h2>
            <div>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <div key={category.id}>
                      <label htmlFor="category" key={category.id}>
                        <input
                          type="checkbox"
                          name="category"
                          value={category.name}
                          onChange={() => {
                            handleSelected(category.id)
                          }}
                        />
                        {category.name}
                      </label>
                    </div>
                  )
                })}
            </div>
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
                        <button
                          onClick={() => {
                            handleAddToCart(product)
                          }}>
                          Add to cart{' '}
                        </button>
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
