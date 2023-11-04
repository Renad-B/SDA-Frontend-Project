import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Product, fetchProducts, findProductById } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../redux/slices/categories/categorySlice'
import { addToCart } from '../redux/slices/Cart/cartSlice'

// const categoryNames = {
//   1: 'Electronics',
//   2: 'Computers',
//   3: 'Mobile Phones',
//   4: 'Gaming',
//   5: 'Photography',
//   6: 'Health & Fitness',
//   7: 'Home Entertainment',
//   8: 'Home Appliances',
//   9: 'Audio',
//   10: 'Storage'
// }

const ProductDetails = () => {
  const { id } = useParams()

  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    console.log(product)
    //add to cart
    dispatch(addToCart(product))
    //remove from cart
  }

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
    dispatch(fetchCategory())
  }, [id])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }
  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'Category not found'
  }
  return (
    <div>
      <h2> -- Proudct Detail --</h2>
      <div className="products-details">
        <div className="product-details">
          {singleProduct && (
            <>
              <img src={singleProduct.image} alt="product img" />
              <h2>Name: {singleProduct.name}</h2>
              <h3>Price: {singleProduct.price} $</h3>
              <p>Description: {singleProduct.description}</p>
              <p>
                Categories:{' '}
                {singleProduct.categories &&
                  singleProduct.categories
                    .map((categoryId) => getCategoryNameById(categoryId))
                    .join(', ')}
              </p>
              <p>Size: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
              <button
                className="btns"
                onClick={() => {
                  handleAddToCart(singleProduct)
                }}>
                Add to cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
