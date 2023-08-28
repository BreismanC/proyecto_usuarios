import { InputForm } from "@atoms/InputForm/InputForm";

const imageData = {
  id: "update-image",
  name: "image",
  label: "Imagen de perfil",
  placeholder: "📎",
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
};

export const InputUpdateImage = ({ register, errors }) => {
  return (
    <InputForm
      {...imageData}
      register={register}
      errors={errors}
      key={imageData.id}
    />
  );
};
