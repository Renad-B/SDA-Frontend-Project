import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../Admin/AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { banUser, deleteUser, fetchUser } from '../../redux/slices/users/userSlice'

const UsersList = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p> {error}...</p>
  }

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBan = (id: number) => {
    dispatch(banUser(id))
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h2>List of users: </h2>
        <section className="users">
          {users.length > 0 &&
            users.map((user) => {
              if (user.role !== 'admin') {
                return (
                  <article key={user.id} className="user">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                    <p>{user.role}</p>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                    <button onClick={() => handleBan(user.id)}>
                      {user.ban ? 'Unblock' : 'Block'}
                    </button>
                  </article>
                )
              }
            })}
        </section>
      </div>
    </div>
  )
}

export default UsersList
