import React, { useEffect, useState } from 'react'
import api from '../api'

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/mock/e-commerce/users.json')
        const userData = response.data
        const user = userData[0]
        setFirstName(user.firstName)
        setLastName(user.lastName)
      } catch (error) {
        console.error('Error', error)
        throw error
      }
    }
    fetchUser()
  }, [])

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    // Perform save operation here, send an API request to update the user's profile
    setIsEditing(false)
  }

  return (
    <div>
      <h1>Profile</h1>
      {isEditing ? (
        <form>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={handleFirstNameChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={handleLastNameChange} />
          </label>
          <br />
          <button onClick={handleSaveClick}>Save</button>
        </form>
      ) : (
        <div>
          <h2>
            Name: {firstName} {lastName}
          </h2>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
