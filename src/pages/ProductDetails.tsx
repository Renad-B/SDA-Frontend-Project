import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts, findProductById } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'

const categoryNames = {
  1: 'Electronics',
  2: 'Computers',
  3: 'Mobile Phones',
  4: 'Gaming',
  5: 'Photography',
  6: 'Health & Fitness',
  7: 'Home Entertainment',
  8: 'Home Appliances',
  9: 'Audio',
  10: 'Storage'
}

const ProductDetails = () => {
  const { id } = useParams()

  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [])

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
  console.log(categories)
  //why the categories doaent appear ?
  return (
    <div>
      <h1>Proudct Detail</h1>
      {singleProduct && (
        <>
          <img src={singleProduct.image} alt="product img" />
          <h1>Name: {singleProduct.name}</h1>
          <h1>Price: {singleProduct.price} $</h1>
          <p>Description: {singleProduct.description}</p>
          <p>
            Categories:{' '}
            {singleProduct.categories &&
              singleProduct.categories.map((categoryId) => getCategoryNameById(categoryId))}
          </p>
          <p>Size: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
          <button>Add to cart</button>
        </>
      )}
    </div>
  )
}

export default ProductDetails
