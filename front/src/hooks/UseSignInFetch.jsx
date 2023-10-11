import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "@redux/states/user";
import { createToken } from "@redux/states/token";
import { getUserByEmailAndPassword } from "@services/api/userEndpoints";
import { PRIVATE_ROUTES } from "@routes/paths";

export const UseSignInFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const userLogIn = async (dataToFetch) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await getUserByEmailAndPassword(
        "users/sign-in?stayLoggedIn=true",
        dataToFetch
      );

      const { details } = data;
      dispatcher(createUser(details.user));
      dispatcher(createToken(details.token));
      navigate(PRIVATE_ROUTES.USER);
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userLogIn,
  };
};
