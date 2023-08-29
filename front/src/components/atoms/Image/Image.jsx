export const Image = (props) => {
  const { src, title } = props;
  return <img src={src} title={title} alt={title} />;
};
