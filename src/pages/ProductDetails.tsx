import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts, findProductById } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
  const { id } = useParams()

  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [id])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }

  return (
    <div>
      <h1>Proudct Detail</h1>
      {singleProduct && (
        <>
          <img src={singleProduct.image} alt="product img" />
          <h1>Name: {singleProduct.name}</h1>
          <h1>Price: {singleProduct.price} $</h1>
          <p>Description: {singleProduct.description}</p>
          <p>Categories: {singleProduct.categories && singleProduct.categories.join(', ')}</p>
          <p>Size: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
          <button>Add to cart</button>
        </>
      )}
    </div>
  )
}

export default ProductDetails
