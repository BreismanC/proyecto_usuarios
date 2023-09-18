import { useState } from "react";
import { useJwt } from "react-jwt";

export const useTokenValidator = (tokenString) => {
  const [data, setData] = useState();
  const [errorToken, setErrorToken] = useState();
  const { decodedToken, isExpired } = useJwt(tokenString);

  if (isExpired) {
    setErrorToken("Token expirado, por favor genera uno nuevo");
    return;
  }
  setData(decodedToken);

  return { data, errorToken };
};
