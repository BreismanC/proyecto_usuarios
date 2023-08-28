import { useSelector } from "react-redux";
import { Image } from "@atoms/Image/Image";
import { Description } from "@atoms/Description/Description";
import { UpdateImageForm } from "../UpdateImageForm/UpdateImageForm";

export const UserCard = () => {
  const { id, name, lastname, email, image } = useSelector(
    (store) => store.user
  );

  return (
    <div id={id}>
      <div>
        <Image src={image} title={`image-${name}`} />
        <UpdateImageForm />
      </div>
      <Description title={"Nombre"} content={name} />
      <Description title={"Apellido"} content={lastname} />
      <Description title={"Correo"} content={email} />
    </div>
  );
};
