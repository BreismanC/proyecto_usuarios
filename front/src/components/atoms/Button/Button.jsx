import "./Button.css";

export const Button = (props) => {
  const { title, handleClick } = props;

  return handleClick ? (
    <button className={`button`} onClick={handleClick}>
      {title}
    </button>
  ) : (
    <button className={`button`}>{title}</button>
  );
};
