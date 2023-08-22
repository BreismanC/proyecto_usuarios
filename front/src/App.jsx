import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PATHS } from "@routes/paths";
import { Header } from "@molecules/Header/Header";
import { User } from "@pages/User/User";
import { SignIn } from "@pages/SignIn/SignIn";
import { SignUp } from "@pages/SignUp/SignUp";

export const App = () => {
  const [token, setToken] = useState(false);

  const handleClick = () => {
    setToken(!token);
  };

  return (
    <BrowserRouter>
      <Header token={token} />
      <h1>{`${token}`}</h1>
      <button onClick={handleClick}>Click me</button>
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateRoutes token={token} />}>
          <Route path={PATHS.HOME} element={<User />} />
          <Route path={PATHS.USER} element={<User />} />
        </Route>

        {/* Public routes */}
        <Route path={PATHS.SIGN_IN} element={<SignIn />} />
        <Route path={PATHS.SIGN_UP} element={<SignUp />} />
        <Route path={PATHS.NOT_FOUND} element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
