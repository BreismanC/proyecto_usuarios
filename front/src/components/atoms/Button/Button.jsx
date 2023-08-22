export const Button = (props) => {
  const { title, handleClick } = props;

  return handleClick ? (
    <button onClick={handleClick}>{title}</button>
  ) : (
    <button>{title}</button>
  );
};
