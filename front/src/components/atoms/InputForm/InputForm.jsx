export const InputForm = (props) => {
  const { id, label, value, placeholder, type } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} placeholder={placeholder} />
    </div>
  );
};
