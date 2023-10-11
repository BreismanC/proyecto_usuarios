import { useState } from "react";
import { Button } from "@atoms/Button/Button";

const imagenes = [
  {
    ID: "1",
    SRC: "ruta_de_la_imagen1",
    ALT: "Texto alternativo 1",
    WIDTH: "100",
    HEIGHT: "100",
    POSITION: "1",
    COLLECTION_ID: "collectionId1",
    STATUS_ID: "statusId1",
  },
  {
    ID: "2",
    SRC: "ruta_de_la_imagen2",
    ALT: "Texto alternativo 2",
    WIDTH: "150",
    HEIGHT: "150",
    POSITION: "2",
    COLLECTION_ID: "collectionId2",
    STATUS_ID: "statusId2",
  },
  {
    ID: "3",
    SRC: "ruta_de_la_imagen3",
    ALT: "Texto alternativo 3",
    WIDTH: "200",
    HEIGHT: "200",
    POSITION: "3",
    COLLECTION_ID: "collectionId3",
    STATUS_ID: "statusId3",
  },
];

export const UploadImages = () => {
  const [image, setImage] = useState(null);

  const handleImages = (event) => {
    setImage(event.target.files[0]);
  };

  const enviarImagenes = async () => {
    const endpoint = "http://localhost:3000/upload-images";

      const formData = new FormData();

      formData.append("src", imagenes[0].SRC);
      formData.append("alt", imagenes[0].ALT);
      formData.append("height", imagenes[0].HEIGHT);
      formData.append("width", imagenes[0].WIDTH);
      formData.append("images-collections", image);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    console.log(response);
  };

  return (
    <section className="uploadImages">
      <h1>Cargar imagenes</h1>
      <form>
        <input type="file" accept="image/*" multiple onChange={handleImages} />
      </form>
      <Button
        title="Enviar"
        handleClick={enviarImagenes}
        onChange={handleImages}
      />
    </section>
  );
};
