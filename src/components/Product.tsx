import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'

import AdminSidebar from './Admin/AdminSidebar'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { createProduct, deleteProductBySlug, updateProduct } from '../services/ProductService'

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const [productName, setProductName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProudctId] = useState('')

  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: ''
  })

  const baseURLProduct = 'http://localhost:3002'

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = async (slug: string) => {
    try {
      await deleteProductBySlug(slug)
      dispatch(fetchProducts())
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: event.target.value }
      })
    }
  }

  const handleEditing = (slug: string, name: string) => {
    setProudctId(slug)
    setIsEditing(!isEditing)
    setProductName(name)

    // Set the existing product details for editing
    const existingProduct = products.find((product) => product.slug === slug)
    if (existingProduct) {
      setProduct({
        ...existingProduct,
        name: existingProduct.name,
        price: existingProduct.price
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('quantity', String(product.quantity))
    formData.append('price', String(product.price))
    formData.append('image', product.image)
    formData.append('categoryId', product.categoryId)

    try {
      if (isEditing) {
        await dispatch(updateProduct(product))
      } else {
        await dispatch(createProduct(formData))
      }
      dispatch(fetchProducts())
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-product">
        <br />
        <h4>Create a product</h4>

        <form action="form-group" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="Add product name .."
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={product.description}
              placeholder="Add product description .."
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              disabled={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="Add product price .."
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              placeholder="Add product quantity .."
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="categoryId"
              value={product.categoryId}
              placeholder="Add product category .."
              disabled={isEditing}
              onChange={handleChange}
            />
          </div>

          <button className="btns">{isEditing ? 'Update' : 'Add'}</button>
        </form>
        <br />
        <h4>List of Prodcts </h4>
        <br />
        <section className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <article key={product.name} className="product">
                  <img src={`${baseURLProduct}/${product.image}`} alt="product img" />
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <button
                    onClick={() => {
                      handleDelete(product.slug)
                    }}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEditing(product.slug, product.name)
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
