import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useSelector(store => store.user);
    if (authUser) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
  

export default PrivateRoute