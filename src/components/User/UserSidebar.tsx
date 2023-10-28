import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user/profile">
        <h1>User Profile</h1>
        <h1>Name: .....</h1>
        <h1>Email .....</h1>
      </div>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/dasboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dasboard/user/orders">Order</Link>
        </li>
      </ul>
    </aside>
  )
}
export default UserSidebar
