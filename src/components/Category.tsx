import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from './Admin/AdminSidebar'
import { fetchCategory } from '../redux/slices/categories/categorySlice'

import { AppDispatch, RootState } from '../redux/store'
import { createCategory, deleteCategory, updateCategory } from '../services/CategoryServicea'

const Category = () => {
  const { categories } = useSelector((state: RootState) => state.categoriesReducer)
  const [categoryName, setCategoryName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [categorySlug, setCategorySlug] = useState('')

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  // if (isLoading) {
  //   return <p>Loading ...</p>
  // }
  // if (error) {
  //   return <p> {error}...</p>
  // }

  const handleDelete = (slug: string) => {
    dispatch(deleteCategory(slug))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCategoryName(value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isEditing) {
      dispatch(createCategory(categoryName))
    } else {
      dispatch(updateCategory({ slug: categorySlug, name: categoryName }))
      dispatch(fetchCategory()) // Refresh
    }
    dispatch(fetchCategory()) // Refresh
    setCategoryName('')
    setIsEditing(false)
  }

  const handleEditing = (slug: string, name: string) => {
    setCategorySlug(slug)
    setIsEditing(!isEditing)
    setCategoryName(name)
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h2>Create a category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="category"
            value={categoryName}
            placeholder="Add category name .."
            onChange={handleChange}
          />
          <button className="btns">{isEditing ? 'Update' : 'Add'}</button>
        </form>
        <br />
        <h2>List of categories </h2>
      </div>

      <section className="categories">
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <article key={category.slug} className="category">
                <p>{category.name}</p>
                <button
                  onClick={() => {
                    handleEditing(category.slug, category.name)
                  }}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(category.slug)
                  }}>
                  Delete
                </button>
              </article>
            )
          })}
      </section>
    </div>
  )
}

export default Category
