import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { decryptText } from "../../security/crypto";
import { UsePatchFetch } from "../../hooks/UsePatchFetch";
import { PUBLIC_ROUTES } from "../../routes/paths";
import Swal from "sweetalert2";
import { Button } from "@atoms/Button/Button";
import { UsePostFetch } from "../../hooks/usePostFetch";

export const EmailValidate = () => {
  const [cipherToken, setCipherToken] = useState();
  const [emailToRender, setEmailToRender] = useState();
  const [tokenString, setTokenString] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { isLoading, error, userPatch } = UsePatchFetch();
  const { isLoadingPost, errorPost, userPost } = UsePostFetch();

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
        Swal.fire(
          "Usuario Validado con éxito.",
          "Ahora puedes iniciar sesión",
          "success"
        );
        setTimeout(() => {
          navigate(PUBLIC_ROUTES.SIGN_IN);
        }, 2000);
      }
    } catch (e) {
      console.log({ e });
    }
  };

  const handleResendEmail = async () => {
    console.log({ emailToRender });
    const dataToFetch = { email: emailToRender };
    try {
      const response = await userPost(dataToFetch);
      if (response.status === 200) {
        Swal.fire(
          "Se ha enviado un nuevo correo.",
          "Revisa tu bandeja de entrada con el link para validar tu usuario",
          "success"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Valida tu email aquí!</h1>

      {!error ? (
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
        </section>
      ) : (
        <>
          {errorPost ? (
            <span>{errorPost}</span>
          ) : (
            <>
              <span>Solicita un nuevo correo para validar tu usuario. </span>
              {isLoadingPost ? (
                <span>Enviando mensaje</span>
              ) : (
                <Button title="Solicitar" handleClick={handleResendEmail} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
