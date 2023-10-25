import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import ProductDetails from '../pages/ProductPage'
import Category from '../components/Category'
import Products from '../components/Product'
import Error from '../pages/ErrorPage'
import AdminDashboard from '../pages/AdminDashboard'
import Navbar from '../components/Navbar'
import Contact from '../pages/Contact'
import UserDashboard from '../pages/UserDashboard'
import AdminOrders from '../components/AdminOrders'
import UserProfile from '../pages/UserProfile'
import UserOrders from '../components/UserOrders'
import Footer from '../components/Footer'
import Login from '../pages/Login'
import UserList from '../components/UsersList'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dasboard/login" element={<Login />} />
        <Route path="/productinfo" element={<ProductDetails />} />

        <Route path="/dasboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/user/profile" element={<UserProfile />} />
        <Route path="/dashboard/user/order" element={<UserOrders />} />

        <Route path="/dasboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/catgeory" element={<Category />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
        <Route path="/dashboard/admin/users" element={<UserList />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Router
