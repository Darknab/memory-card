import PropTypes from 'prop-types';

export default function Score({ score, bestScore }) {
  return (
    <div className="score">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
  </div>
  )
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
}