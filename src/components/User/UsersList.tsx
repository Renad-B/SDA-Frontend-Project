import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../Admin/AdminSidebar'

import { banUser, deleteUser, fetchUser } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

import Table from 'react-bootstrap/Table'

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
          {users.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  if (user.role !== 'admin') {
                    return (
                      <tr key={user.id}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="btns" onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                          <button className="btns" onClick={() => handleBan(user.id)}>
                            {user.ban ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      </tr>
                    )
                  }
                  return null
                })}
              </tbody>
            </Table>
          )}
        </section>
      </div>
    </div>
  )
}

export default UsersList
