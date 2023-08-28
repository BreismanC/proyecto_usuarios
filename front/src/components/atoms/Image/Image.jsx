export const Image = (props) => {
  const { src, title } = props;
  return (
    <div>
      <img src={src} title={title} alt={title} />
    </div>
  );
};
