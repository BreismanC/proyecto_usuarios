import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { decryptText } from "../../security/crypto";
import { UsePatchFetch } from "../../hooks/UsePatchFetch";
import { PUBLIC_ROUTES } from "../../routes/paths";
import Swal from "sweetalert2";
import { Button } from "@atoms/Button/Button";

export const EmailValidate = () => {
  const [cipherToken, setCipherToken] = useState();
  const [emailToRender, setEmailToRender] = useState();
  const [tokenString, setTokenString] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { isLoading, error, userPatch } = UsePatchFetch();

  const [params] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (params.get("token")) {
      const decrtypToken = params.get("token");
      setCipherToken(decrtypToken);

      const decryptData = decryptText(decrtypToken);
      const { email, token } = JSON.parse(decryptData);

      setEmailToRender(email);
      setTokenString(token);
    } else {
      setErrorMessage("error, no existe token");
    }
  }, []);

  const handleValidationEmail = async () => {
    const dataToFetch = {
      validatedUser: true,
    };
    try {
      const response = await userPatch(dataToFetch, tokenString);
      if (response.status === 204) {
        Swal.fire("Usuario creado.", "Debes validar el email", "success");
        setTimeout(() => {
          navigate(PUBLIC_ROUTES.SIGN_IN);
        }, 2000);
      }
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <>
      <h1>Valida tu email aquí!</h1>
      <section className={`emailValidate`}>
        <h2>
          Hola {emailToRender}, debes validar tu email haciendo click aquí 👇
        </h2>
        {/* <h3>{cipherToken ? cipherToken : errorMessage}</h3>
      {!errorMessage && <p>{tokenString}</p>} */}
        {isLoading ? (
          <span>Validando usuario</span>
        ) : (
          <Button title="validar" handleClick={handleValidationEmail} />
        )}
        {error && <span>{error}</span>}
      </section>
    </>
  );
};
