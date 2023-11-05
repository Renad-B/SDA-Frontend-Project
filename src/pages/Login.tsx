import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUser, login } from '../redux/slices/users/userSlice'

const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const findUser = users.find((userData) => userData.email === user.email)

      if (!findUser) {
        console.log('User dosent exist')
        return
      }

      if (findUser.password !== user.password) {
        console.log('User password is not Correct!')
        return
      }

      if (findUser.password !== user.password) {
        console.log('User password is not Correct!')
        return
      }

      if (findUser.ban) {
        console.log('You are Blocked')
        return
      }
      findUser && findUser.password === user.password
      dispatch(login(findUser))
      navigate(pathName ? pathName : `/dasboard/${findUser.role}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
    if (user.password.length < 6) {
      setPasswordError('password should be more than 6 character')
      return
    }
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
      </form>
    </div>
  )
}

export default Login
