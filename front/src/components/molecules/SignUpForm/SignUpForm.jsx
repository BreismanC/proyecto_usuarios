import { useForm } from "react-hook-form";
import { InputForm } from "@atoms/InputForm/InputForm";
import { Button } from "@atoms/Button/Button";
import { objectToArrayOfValues, formatDataToFetch } from "@utilities/helpers";
import { UseSignUpFetch } from "@hooks/UseSingUpFetch";

const dataSignUpForm = {
  inputs: {
    name: {
      id: "name-sign-up",
      name: "name",
      label: "Nombre",
      placeholder: "Ingresa tu nombre",
      type: "text",
      validations: {
        required: {
          value: true,
          message: "Nombre requerido",
        },
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "Nombre solo debe contener caracteres alfabéticos",
        },
        minLength: {
          value: 3,
          message: "Nombre debe contener mínimo 3 caracteres",
        },
        maxLength: {
          value: 100,
          message: "Nombre debe contener máximo 100 caracteres",
        },
      },
    },
    lastname: {
      id: "lastname-sign-up",
      name: "lastname",
      label: "Apellido",
      placeholder: "Ingresa tu apellido",
      type: "text",

      validations: {
        required: {
          value: true,
          message: "Apellido requerido",
        },
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "Apellido solo debe contener caracteres alfabéticos",
        },
        minLength: {
          value: 3,
          message: "Apellido debe contener mínimo 3 caracteres",
        },
        maxLength: {
          value: 100,
          message: "Apellido debe contener máximo 100 caracteres",
        },
      },
    },
    email: {
      id: "email-sign-up",
      name: "email",
      label: "Correo electrónico",
      placeholder: "ejemplo@gmail.com",
      type: "email",
      validations: {
        required: {
          value: true,
          message: "Correo electrónico requerido",
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Correo no tiene formato válido(ejemplo@gmail.com)",
        },
      },
    },
    password: {
      id: "password-sign-up",
      name: "password",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      type: "password",
      validations: {
        required: {
          value: true,
          message: "Contraseña requerida",
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
    image: {
      id: "image-sign-up",
      name: "image",
      label: "Imagen de perfil",
      placeholder: "Subir archivo",
      type: "file",
      validations: {
        validate: (value) => {
          if (value[0]) {
            return (
              (value && value[0].type.includes("image")) ||
              "La imagen no tiene un formato válido"
            );
          } else {
            return true;
          }
        },
      },
    },
  },
  button: {
    title: "Registrarse",
  },
};

export const SignUpForm = () => {
  const { inputs, button } = dataSignUpForm;
  const InputsArray = objectToArrayOfValues(inputs);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, error, userRegister } = UseSignUpFetch();

  const onSubmit = async (data) => {
    console.log(data);
    const bodyRequest = formatDataToFetch(data);
    const dataResponse = await userRegister(bodyRequest);
    console.log(dataResponse);
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
      {isLoading ? <span>cargando...</span> : <Button {...button} />}
      {error && <span>{error}</span>}
    </form>
  );
};
