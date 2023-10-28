import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router-dom'
import Login from '../pages/Login'

const ProtectedRoute = () => {
  //one line to make the path dynmaic,user or admin
  //it knows the pathname, intersting
  const location = useLocation()
  const { isLoggedIn } = useSelector((state: RootState) => state.usersR)
  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}

export default ProtectedRoute
