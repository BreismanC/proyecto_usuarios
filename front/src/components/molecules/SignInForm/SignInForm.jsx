import { useForm } from "react-hook-form";
import { InputForm } from "@atoms/InputForm/InputForm";
import { Button } from "@atoms/Button/Button";
import { objectToArrayOfValues } from "@utils/helpers.js";
import { getUserByEmailAndPassword } from "../../../services/api/userEndpoints";

const dataSignInForm = {
  inputs: {
    email: {
      id: "email-sign-in",
      name: "email",
      label: "Correo electrónico",
      placeholder: "ejemplo@gmail.com",
      type: "email",
      validations: {
        required: {
          value: true,
          message: "Correo requerido",
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Correo con formato inválido",
        },
      },
    },
    password: {
      id: "password-sign-in",
      name: "password",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      type: "password",
      validations: {
        required: {
          value: true,
          message: "Nombre requerido",
        },
        minLength: {
          value: 6,
          message: "Contraseña debe contener mínimo 6 caracteres",
        },
        maxLength: {
          value: 12,
          message: "Contraseña debe contener máximo 12 caracteres",
        },
        validate: (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value);
          return (
            (hasUpperCase && hasNumber && hasSpecialChar) ||
            "Debe incluir una mayúscula, un número y un caracter especial"
          );
        },
      },
    },
  },
  button: {
    title: "Iniciar sesión",
  },
};

export const SignInForm = () => {
  const { inputs, button } = dataSignInForm;
  const InputsArray = objectToArrayOfValues(inputs);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (dataToFetch) => {
    const { data } = await getUserByEmailAndPassword(
      "users/sign-in",
      dataToFetch
    );
    const { details } = data;
    console.log(details);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {InputsArray.map((element) => {
        return (
          <InputForm
            {...element}
            register={register}
            errors={errors}
            key={element.id}
          />
        );
      })}
      <Button {...button} />
    </form>
  );
};
