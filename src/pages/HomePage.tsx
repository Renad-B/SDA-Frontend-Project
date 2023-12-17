import { ChangeEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'

import SortProducts from '../components/SortProducts'
import SearchInput from '../components/SearchInput'

import { fetchCategory } from '../redux/slices/categories/categorySlice'
import { Product, fetchProducts, searchProduct } from '../redux/slices/products/productSlice'
import { addToCart } from '../redux/slices/Cart/cartSlice'

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    // Fetch categories
    dispatch(fetchCategory())

    // Fetch products
    dispatch(fetchProducts())
  }, [dispatch]) // Added dependency array

  //The pagination here
  //current page, how many items per page
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  //pagination logic
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    console.log('Search term:', searchTerm)
    dispatch(searchProduct(searchTerm))
  }
  const handleSelected = (category: string) => {
    if (selectedCategory.includes(category)) {
      const filterdCategory = selectedCategory.filter((category) => category !== category)
      setSelectedCategory(filterdCategory)
    } else {
      setSelectedCategory((prevState) => {
        return [...prevState, category]
      })
    }
  }
  const filterProducts: Product[] = products.filter((product: Product) => {
    const categoryMatch: boolean =
      selectedCategory.length === 0 ||
      selectedCategory.some((id: string) => product.categoryId.includes(id))

    const searchMatch: boolean =
      searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())

    return categoryMatch && searchMatch
  })

  //?so it work this way because array

  // const filterProducts: Product[] = Array.isArray(products)
  //   ? products.filter((product: Product) => {
  //       const categoryMatch: boolean =
  //         selectedCategory.length === 0 ||
  //         selectedCategory.some((id: string) => product.categories.includes(id))

  //       const searchMatch: boolean =
  //         searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())

  //       return categoryMatch && searchMatch
  //     })
  //   : []

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const buttonElements = []
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(
      <button
        className="btn"
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </button>
    )
  }
  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }

  const handleAddToCart = (product: Product) => {
    //add to cart
    dispatch(addToCart(product))
  }
  return (
    <div>
      <section className="hero" id="hero">
        <h1>Technology Company</h1>
        <div className="contianer-home">
          <div className="sidebar">
            <h2>Filter by Category</h2>
            <div>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <div key={category._id}>
                      <label htmlFor="category" key={category._id}>
                        <input
                          type="checkbox"
                          name="category"
                          value={category.name}
                          onChange={() => {
                            handleSelected(category._id)
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
            <h2>All product are listed here:</h2>
            <section>
              <div className="products">
                {currentItems.length > 0 &&
                  currentItems.map((product: Product) => {
                    return (
                      <article key={product.id} className="product">
                        {/* <img src={`${baseURLProduct}/${product.image}`} alt="product img" /> */}
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price} $</p>
                        <button
                          onClick={() => {
                            handleAddToCart(product)
                          }}>
                          Add to cart{' '}
                        </button>
                        <Link to={`/products/${product.slug}`}>
                          <button>Show details </button>
                        </Link>
                      </article>
                    )
                  })}
              </div>
              <div className="page">
                <button
                  className="btns"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}>
                  Next
                </button>
                <>{buttonElements}</>
                <button className="btns" onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
