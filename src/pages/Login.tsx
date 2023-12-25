import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchUser } from '../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { loginUser, logoutUser } from '../services/UserService'
import axios from 'axios'

axios.defaults.withCredentials = true

const Login = ({ pathName }: { pathName: string }) => {
  const { users, userData } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchUser())
  // }, [dispatch])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  //validation
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
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
  useEffect(() => {
    if (userData) {
      navigate(
        pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`
      )
      console.log(userData)
    }
  }, [userData, navigate, pathName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(loginUser(user))
      // navigate(`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`)
      // console.log(userData)
    } catch (error) {
      throw Error('cant loging')
    }
    // setUser({
    //   email: '',
    //   password: ''
    // })
  }

  return (
    <div className="login-container">
      <h1>User Login</h1>
      <form className="login-form" action="login" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email: </label>
        <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
        {emailError && <span className="error">{emailError}</span>}
        <label htmlFor="password"> Password: </label>
        <p>{passwordError}</p>
        <input
          type="password"
          name="password"
          placeholder="password must be 6 characters"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <br />
        <button type="submit">
          <Link to="/dashboard/forget-password">Forget Password ?</Link>
        </button>
      </form>
    </div>
  )
}

export default Login
