import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user/profile"></div>
      <h2>Menu</h2>
      <p>Name: // how to add it</p>
      <ul>
        <li>
          <Link to="/dasboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dasboard/user/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}
export default UserSidebar
