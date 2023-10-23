import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="admin-profile">
        <h1>Admin Profile</h1>
        <h1>Name: .....</h1>
        <h1>Email .....</h1>
      </div>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/dashboard/admin/catgeory">Category</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}
export default AdminSidebar;
