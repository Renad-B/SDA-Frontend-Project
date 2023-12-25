import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../Admin/AdminSidebar'

import { fetchUser } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

import Table from 'react-bootstrap/Table'

import { banUser, deleteUser, grantRole, unbanUser } from '../../services/UserService'

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

  //why it give me error in the console but works ?
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id)
      // alert('success deleted user')
      //see if you can use toast
      dispatch(fetchUser())
    } catch (error) {
      throw Error('Cant fetch the user')
    }
    //re fetch
    dispatch(fetchUser())
  }

  const handleBanUnban = async (id: string, isBanned: boolean) => {
    try {
      const response = isBanned ? await unbanUser(id) : await banUser(id)
      //give a toast
      console.log(response)
      //why its not working ?
      dispatch(fetchUser())
      //response or toast message
    } catch (error) {
      throw Error('canr fetch users')
    }
  }

  //role
  const handleGrantRole = async (id: string) => {
    try {
      if (id) {
        dispatch(grantRole(id))
      }
    } catch (error) {
      throw Error('cant fetch users')
    }
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
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  if (!user.isAdmin) {
                    console.log(user.image)
                    return (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className="btns" onClick={() => handleDelete(user._id)}>
                            Delete
                          </button>
                          <button
                            className="btns"
                            onClick={() => handleBanUnban(user._id, user.isBanned)}>
                            {user.isBanned ? 'unban' : 'ban'}
                          </button>
                          <button className="btns" onClick={() => handleGrantRole(user._id)}>
                            Change the role as Admin
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
