import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '../redux/store'
import { addUser, fetchUser } from '../redux/slices/users/userSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })
  //validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
    // Validate email
    if (name === 'email') {
      if (!emailPattern.test(value)) {
        setEmailError('Invalid email address')
      } else {
        setEmailError('')
      }
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }

    if (user.firstName.length < 3) {
      setFirstNameError('First name must be at least 3 character')
      return
    }

    if (user.lastName.length < 3) {
      setLastNameError('last name must be at least 3 character')
      return
    }
    if (user.password.length < 6) {
      setPasswordError('password should be more than 6 character')
      return
    }
    if (emailError) {
      return
    }

    //dispatch
    dispatch(fetchUser()).then(() => dispatch(addUser(newUser)))
    navigate('/dasboard/login')
  }
  return (
    <div className="register-container">
      <h1>User Registration</h1>
      <form action="register-form" onSubmit={handleSubmit} className="register-form">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" onChange={handleChange} required />
        <p>{firstNameError}</p>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" onChange={handleChange} required />
        <p>{lastNameError}</p>
        <label htmlFor="email">Email:</label>
        {emailError && <p>{emailError}</p>}
        <input type="email" name="email" onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <p>{passwordError}</p>
        <input type="password" name="password" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Register
