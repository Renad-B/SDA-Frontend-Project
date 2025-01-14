import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '../redux/store'
import { createUser } from '../services/UserService'
import { fetchUser } from '../redux/slices/users/userSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    // image: '',
    phone: '',
    address: ''
  })

  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type === 'file') {
      console.log('file selected')
      const fileInput = (event.target as HTMLInputElement) || ''
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value }
      })
    }
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Create a form data object
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('phone', user.phone)
    formData.append('address', user.address)

    if (user.name.length < 3) {
      setNameError('First name must be at least 3 characters')
      return
    }

    if (user.password.length < 6) {
      setPasswordError('Password should be more than 6 characters')
      return
    }
    try {
      await dispatch(createUser(formData))
      dispatch(fetchUser())
      // ... other logic after successful registration
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register-container">
      <h1>User Registration</h1>
      <form action="register-form" onSubmit={handleSubmit} className="register-form">
        <label htmlFor="name"> Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} required />
        <p>{nameError}</p>

        <label htmlFor="email">Email:</label>
        {emailError && <p>{emailError}</p>}
        <input type="email" name="email" onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <p>{passwordError}</p>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <p>{passwordError}</p>
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />

        <label htmlFor="address">Address:</label>
        <textarea name="address" value={user.address} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Register
