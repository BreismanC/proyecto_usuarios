import { Navigate, Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "./paths";

export const PrivateRoutes = (props) => {
  const { children, token } = props;

  if (!token) {
    return <Navigate to={PUBLIC_ROUTES.SIGN_IN} />;
  } else {
    return children ? children : <Outlet />;
  }
};
