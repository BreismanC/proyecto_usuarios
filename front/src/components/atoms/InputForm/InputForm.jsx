export const InputForm = (props) => {
  const { id, label, register, name, placeholder, type, validations, errors } =
    props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(`${name}`, { ...validations })}
      />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};
