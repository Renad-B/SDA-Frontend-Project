import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'

import { activateUserAccount } from '../services/UserService'

export const ActivateUser = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  console.log(token)
  console.log(decoded)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const handleActivateUser = async () => {
    //make req to api with token

    try {
      dispatch(activateUserAccount(token))

      // if is successful then set the user to the login page
      navigate('/dashboard/login')
    } catch (error) {
      throw new Error('Cant activate the user')
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
