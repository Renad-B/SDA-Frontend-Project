import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { logout } from '../redux/slices/users/userSlice'
import { useEffect } from 'react'

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersR)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/')
      }
    }, [isLoggedIn, navigate])
  }
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {isLoggedIn && (
          <>
            <li>
              <Link to="/dasboard/logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li>
              <Link to={`/dasboard/${userData.role}`}>{userData.role}</Link>
            </li>
          </>
        )}

        {/*!isLoggedIn && (
          <li>
            <Link to="/dasboard/logout" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )*/}

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/dasboard/login">Login</Link>
        </li>
        <li>
          <Link to="/dasboard/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
