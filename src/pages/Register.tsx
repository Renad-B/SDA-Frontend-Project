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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user } // Add parentheses after getTime
    dispatch(fetchUser()).then(() => dispatch(addUser(newUser)))
    navigate('/dasboard/login')
  }
  return (
    <div className="form">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="firstName">first Name :</label>
        <input type="text" name="firstName" onChange={handleChange} />
        <label htmlFor="lastName">last Name :</label>
        <input type="text" name="lastName" onChange={handleChange} />
        <label htmlFor="email">email</label>
        <input type="email" name="email" onChange={handleChange} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Register
