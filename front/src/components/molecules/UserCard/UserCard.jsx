import { useSelector } from "react-redux";
import { Image } from "@atoms/Image/Image";
import { Description } from "@atoms/Description/Description";

export const UserCard = () => {
  const { id, name, lastname, email, image } = useSelector(
    (store) => store.user
  );

  return (
    <div id={id}>
      <Image src={image} title={`image-${name}`} />
      <Description title={"Nombre"} content={name} />
      <Description title={"Apellido"} content={lastname} />
      <Description title={"Correo"} content={email} />
    </div>
  );
};
