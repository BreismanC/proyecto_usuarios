import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "@routes/PrivateRoutes";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@routes/paths";
import { Header } from "@molecules/Header/Header";
import { User } from "@pages/User/User";
import { SignIn } from "@pages/SignIn/SignIn";
import { SignUp } from "@pages/SignUp/SignUp";
import { EmailValidate } from "./pages/EmailValidate/EmailValidate";
import { UploadImages } from "./pages/UploadImages/UploadImages";

export const App = () => {
  const token = useSelector((store) => store.token);

  return (
    <>
      <Header token={token} />
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateRoutes token={token} />}>
          <Route path={PRIVATE_ROUTES.HOME} element={<User />} />
          <Route path={PRIVATE_ROUTES.USER} element={<User />} />
        </Route>

        {/* Public routes */}
        <Route path={PUBLIC_ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={PUBLIC_ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={PUBLIC_ROUTES.VALIDATE_EMAIL}>
          <Route path="*" element={<EmailValidate /> } />
        </Route>
        <Route path={PUBLIC_ROUTES.UPLOAD_IMAGES} element={<UploadImages />} />
        <Route path={PUBLIC_ROUTES.NOT_FOUND} element={<h1>NOT FOUND</h1>} />
      </Routes>
    </>
  );
};
