import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/dasboard/user">User</Link>
        </li>
        <li>
          <Link to="/dasboard/admin">Admin</Link>
        </li>
        <li>
          <Link to="/dasboard/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
