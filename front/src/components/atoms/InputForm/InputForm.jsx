import { useState } from "react";
import "./InputForm.css";

export const InputForm = (props) => {
  const { id, label, register, name, type, validations, errors } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`field ${name}`}>
      <label className={`label ${name} ${isActive && "active"}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`input ${name}`}
        type={type}
        id={id}
        {...register(`${name}`, { ...validations })}
        onKeyDown={() => setIsActive(true)}
        onBlur={(e) => {
          if (!e.target.value || e.target.value == "") setIsActive(false);
        }}
      />
      {name === "image" && <button>Imagen de perfil</button>}
      {errors[name] && <span className="error">{errors[name].message}*</span>}
    </div>
  );
};
