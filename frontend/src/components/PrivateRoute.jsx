import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const { isAuthenticated , checkingStatus} = useAuthStatus();
    if (checkingStatus) {
        return <Spinner/>
    }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;