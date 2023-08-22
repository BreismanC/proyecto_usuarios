import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";

export const PrivateRoutes = (props) => {
  const { children, token } = props;

  if (!token) {
    return <Navigate to={PATHS.SIGN_IN} />;
  } else {
    return children ? children : <Outlet />;
  }
};
