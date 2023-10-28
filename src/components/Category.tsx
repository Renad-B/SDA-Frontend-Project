import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './Admin/AdminSidebar'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { fetchCategory } from '../redux/slices/categories/categorySlice'

const Category = () => {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoriesR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h2>Create a category</h2>
        <h2>List of categories </h2>
        <section className="categories">
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <article key={category.id} className="category">
                  <p>{category.name}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Category
