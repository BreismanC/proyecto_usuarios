import "./Description.css"

export const Description = ({ title, content }) => {
  return (
    <h3 className="description">
      <span className="description__span">{title}</span>: {content}
    </h3>
  );
};
