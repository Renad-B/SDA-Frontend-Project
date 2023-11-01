import { Link } from 'react-router-dom'

const AdminSidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="admin-profile"></div>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/dasboard/admin/catgeory">Category</Link>
        </li>
        <li>
          <Link to="/dasboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dasboard/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/dasboard/admin/users">Users</Link>
        </li>
      </ul>
    </aside>
  )
}
export default AdminSidebar
