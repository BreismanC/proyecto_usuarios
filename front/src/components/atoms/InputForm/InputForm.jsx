import "./InputForm.css";

export const InputForm = (props) => {
  const { id, label, register, name, type, validations, errors } = props;

  return (
    <div className={`field ${name}`}>
      <label className={`label ${name}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`input ${name}`}
        type={type}
        id={id}
        {...register(`${name}`, { ...validations })}
      />
      {name === "image" && <button>Imagen de perfil</button>}
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};
