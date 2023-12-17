import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Product, fetchProducts, findProductById } from '../redux/slices/products/productSlice'
import { fetchCategory } from '../redux/slices/categories/categorySlice'
import { addToCart } from '../redux/slices/Cart/cartSlice'

import { AppDispatch, RootState } from '../redux/store'

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
    dispatch(fetchProducts()).then(() => dispatch(findProductById(String(id))))
    dispatch(fetchCategory())
  }, [id])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }
  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find((category) => category._id === categoryId)
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
              <h5>Name: {singleProduct.name}</h5>
              <h5>Price: {singleProduct.price} $</h5>
              <p>Description: {singleProduct.description}</p>
              <p>Shipping: {singleProduct.shipping}</p>
              <p>Quanity: {singleProduct.quantity}</p>
              <p>Category: {singleProduct.categoryId}</p>
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
