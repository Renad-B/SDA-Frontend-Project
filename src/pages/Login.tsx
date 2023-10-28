import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUser, login } from '../redux/slices/users/userSlice'

const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.usersR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    console.log(users)
    event.preventDefault()
    try {
      const FindUser = users.find((userData) => userData.email === user.email)
      if (FindUser && FindUser.password === user.password) {
        dispatch(login(FindUser))
        navigate(pathName ? pathName : `/dasboard/${FindUser.role}`)
      } else {
        console.log('Email or password is wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
      <h1>User Login</h1>
      <form className="login-form" action="login" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email: </label>
        <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
        <label htmlFor="password"> Password: </label>
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
