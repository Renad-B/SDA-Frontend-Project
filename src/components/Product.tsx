import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from './Admin/AdminSidebar'
import { AppDispatch, RootState } from '../redux/store'

import { fetchProducts } from '../redux/slices/products/productSlice'
import { createProduct, deleteProductBySlug } from '../services/ProductService'

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsReducer)
  const [productName, setProductName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [productId, setProudctId] = useState(0)

  const [product, setProduct] = useState({
    name: '',
    // image: '',
    description: '',
    price: 0,
    quantity: 0,
    category: ''
  })

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'file') {
      const imageFile = event.target.files?.[0]
      const { name } = event.target
      setProduct((prevProduct) => {
        return { ...prevProduct, [name]: imageFile }
      })
    } else {
      const { value, name } = event.target
      setProduct((prevProduct) => {
        return { ...prevProduct, [name]: value }
      })
    }
  }

  const handleEditing = (id: number, name: string) => {
    setProudctId(id)
    setIsEditing(!isEditing)
    setProductName(name)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log(product)
    // const formData = new FormData()
    // formData.append('name', product.name)
    // formData.append('description', product.description)
    // formData.append('quantity', String(product.quantity))
    // formData.append('price', String(product.price))
    // // formData.append('image', product.image)
    // formData.append('category', product.category)

    // Dispatch product and fetchproduct
    try {
      await dispatch(createProduct(product))
      // console.log(formData)
      dispatch(fetchProducts())
      // ... other logic after successful registration
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }

  // if (isLoading) {
  //   return <p>Loading ...</p>
  // }
  // if (error) {
  //   return <p> {error}...</p>
  // }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-product">
        <br />
        <h4>Create a product</h4>

        <form action="register-form" onSubmit={handleSubmit}>
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
          {/* 
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              placeholder="Add product image URL .."
              accept="image/*"
              onChange={handleChange}
            />
          </div> */}

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
                  {/* <img src={product.image} alt="product-img" /> */}
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
