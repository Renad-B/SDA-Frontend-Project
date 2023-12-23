import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserSidebar from '../components/User/UserSidebar'

import { AppDispatch, RootState } from '../redux/store'
// import { updateUser } from '../services/UserService'

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    Name: userData?.name
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
    console.log(user)
    const updateUserData = { _id: userData?._id, ...user }
    // dispatch(updateUser(updateUserData))
  }
  return (
    <div className="container">
      <UserSidebar />
      <div className="main-content">
        {userData && (
          <div>
            <div>
              <p>Profile information:</p>
              <p>Name: {`${userData?.name}`}</p>
              <p>Email: {`${userData?.email} `}</p>
              <p>ID: {`${userData?._id} `}</p>
              <p>Role: {`${userData?.isAdmin ? 'Admin' : 'User'} `}</p>
              <button className="btns" onClick={handleEditClick}>
                Edit profile
              </button>
            </div>
            {isEditing && (
              <form action="" onSubmit={handleSubmit}>
                <input type="text" name="Name" value={user.Name} onChange={handleChange}></input>
                <button className="btns" type="submit">
                  Update profile
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
