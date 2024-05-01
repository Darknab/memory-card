import PropTypes from "prop-types";

export default function Card({ id, poster, title, onClick }) {

  const path = `https://image.tmdb.org/t/p/w500/${poster}`;
  const alt = `Poster of ${title}`

  return (
    <div className="card">
      <img src={path} alt={alt} id={id} onClick={onClick} />
      <h3>{title}</h3>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}