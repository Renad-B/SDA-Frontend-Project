import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { activateUserAccount } from '../services/UserService'

export const ActivateUser = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  console.log(token)
  console.log(decoded)
  const navigate = useNavigate()

  const handleActivateUser = async () => {
    //make req to api with token

    try {
      const response = await activateUserAccount(token)
      console.log(response)
      // if is successful then set the user to the login page
      //!dont forget to do the login page
      navigate('/dasboard/login')
    } catch (error) {
      // throw new Error('Cant activate the user')
      //! when i use the throw error it wont work why ?
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Hello {decoded.name}! Click here to activate the account</h2>
      <button className="" onClick={handleActivateUser}>
        Activate Your Account
      </button>
    </div>
  )
}

export default ActivateUser
