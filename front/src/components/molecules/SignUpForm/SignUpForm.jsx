import { InputForm } from "@atoms/InputForm/InputForm";
import { Button } from "@atoms/Button/Button";
import { objectToArrayOfKyeValue } from "@utils/commonFunctions";

const dataSignUpForm = {
  inputs: {
    name: {
      id: "name-sign-up",
      label: "Nombre",
      placeholder: "Ingresa tu nombre",
      type: "text",
    },
    lastname: {
      id: "lastname-sign-up",
      label: "Apellido",
      placeholder: "Ingresa tu apellido",
      type: "text",
    },
    email: {
      id: "email-sign-up",
      label: "Correo electrónico",
      placeholder: "ejemplo@gmail.com",
      type: "email",
    },
    password: {
      id: "password-sign-up",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      type: "password",
    },
    image: {
      id: "image-sign-up",
      label: "Imagen de perfil",
      placeholder: "Subir archivo",
      type: "file",
    },
  },
  button: {
    title: "Registrarse",
    handleClick: () => alert("Registro exitoso"),
  },
};

export const SignUpForm = () => {
  const { inputs, button } = dataSignUpForm;
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
