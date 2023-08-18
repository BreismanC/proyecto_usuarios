import { Routes, Route } from "react-router-dom";
import { User } from "./pages/User";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export const App = () => {
  return (
    <App>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </App>
  );
};
