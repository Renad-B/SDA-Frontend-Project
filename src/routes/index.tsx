import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import ProductDetails from '../pages/ProductDetails'
import Category from '../components/Category'
import Products from '../components/Product'
import Error from '../pages/ErrorPage'
import AdminDashboard from '../pages/AdminDashboard'
import Navbar from '../components/Navbar'
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
import Cart from '../pages/Cart'
import { ActivateUser } from '../pages/ActivateUser'
import { ForgetPassword } from '../pages/ForgetPassword'
import ResetPassword from '../pages/ResetPassword'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/dashboard/login" element={<Login pathName={''} />} />
        <Route path="/dashboard/logout" element={<Home />} />
        <Route path="/dashboard/forget-password" element={<ForgetPassword />} />
        <Route path="/users/reset-password/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard/register" element={<Register />} />
        <Route path="/productinfo" element={<ProductDetails />} />
        <Route path="/users/activate/:token" element={<ActivateUser />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<Category />} />
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
