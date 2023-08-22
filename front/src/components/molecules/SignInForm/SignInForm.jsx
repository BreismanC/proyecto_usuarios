import { InputForm } from "@atoms/InputForm/InputForm";
import { Button } from "@atoms/Button/Button";
import { objectToArrayOfKyeValue } from "@utils/commonFunctions.js";

const dataSignInForm = {
  inputs: {
    email: {
      id: "email-sign-in",
      label: "Correo electrónico",
      placeholder: "ejemplo@gmail.com",
      type: "email",
    },
    password: {
      id: "password-sign-in",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      type: "password",
    },
  },
  button: {
    title: "Iniciar sesión",
    handleClick: () => alert("Inicio de sesión"),
  },
};

export const SignInForm = () => {
  const { inputs, button } = dataSignInForm;
  const InputsArray = objectToArrayOfKyeValue(inputs);

  return (
    <form>
      {InputsArray.map((element) => {
        return <InputForm {...element[1]} key={element.id} />;
      })}
      <Button {...button} />
    </form>
  );
};
