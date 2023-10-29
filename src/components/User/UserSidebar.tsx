import { Link } from 'react-router-dom'
import ProfilePage from '../../pages/Profilepage'

const UserSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user/profile">
        <ProfilePage />
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
