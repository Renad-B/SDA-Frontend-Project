import { useDispatch, useSelector } from 'react-redux'
import UserSidebar from '../components/User/UserSidebar'
import { AppDispatch, RootState } from '../redux/store'
import { FormEvent, useState } from 'react'
import { updateUser } from '../redux/slices/users/userSlice'

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserData))
  }
  //why its not working the updating ?
  return (
    <div className="container">
      <UserSidebar />
      <div className="main-content">
        {userData && (
          <div>
            <div>
              <p>Profile information:</p>
              <p>Name: {`${userData?.firstName} ${userData?.lastName} `}</p>
              <p>Email: {`${userData?.email} `}</p>
              <p>ID: {`${userData?.id} `}</p>
              <p>Role: {`${userData?.role} `}</p>
              <button onClick={handleEditClick}>Edit profile</button>
            </div>
            {isEditing && (
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}></input>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}></input>
                <button type="submit">Update profile</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
