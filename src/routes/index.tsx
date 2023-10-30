import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import ProductDetails from '../pages/ProductDetails'
import Category from '../components/Category'
import Products from '../components/Product'
import Error from '../pages/ErrorPage'
import AdminDashboard from '../pages/AdminDashboard'
import Navbar from '../components/Navbar'
import Contact from '../pages/Contact'
import UserDashboard from '../pages/UserDashboard'
import AdminOrders from '../components/Admin/AdminOrders'
import UserProfile from '../pages/UserProfile'
import UserOrders from '../components/User/UserOrders'
import Footer from '../components/Footer'
import Login from '../pages/Login'
import UserList from '../components/User/UsersList'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Register from '../pages/Register'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dasboard/login" element={<Login />} />
        <Route path="/dasboard/logout" element={<Home />} />
        <Route path="/dasboard/register" element={<Register />} />
        <Route path="/productinfo" element={<ProductDetails />} />

        <Route path="/dasboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dasboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/catgeory" element={<Category />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<UserList />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Router
