import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'

import { forgetPassword } from '../services/UserService'

export const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(forgetPassword(email))
    console.log('email has been send')
  }
  return (
    <div className="container">
      ForgetPassword
      <form onSubmit={handleSubmit} action="login-form">
        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your Email"
          />
        </div>
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  )
}
