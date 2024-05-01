import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import movies from "../getData";
import Card from "./Card";
import { useState } from "react";
import Score from "./Score";

function shuffle(array) {
  for (let i = array.length - 1 ; i >= 0 ; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [ array[i], array[j] ] = [ array[j], array[i] ]
  }
}

shuffle(movies);

export default function Content() {
  const [ displayedMovies, setDisplayedMovies ] = useState(movies);
  const [ showModal, setShowModal ] = useState(false);
  const [ clicked, setClicked ] = useState([]);
  const [ bestScore, setBestScore ] = useState(0);


  function handleCardClick(e) {
    shuffle(movies);
    setDisplayedMovies([...movies]);
    calculateScore(e.target.id);
  }

  function calculateScore(selected) {
    if (clicked.includes(selected)) {
      gameOver();
    } else {
      setClicked(prevclicked => {
        const newClicked = [...prevclicked, selected];
        
        const newBestScore = newClicked.length > bestScore ? newClicked.length : bestScore;
        setBestScore(newBestScore);
        if (newClicked.length === 9) gameOver();
        return newClicked;
      });
    }
  }

  function gameOver() {
    setShowModal(true);
    console.log('game over!')
  }

  function ModalContent({ onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          {clicked.length === 9 ? 
             <>
              <h2>Congratulatios</h2>
              <p>The force is strong with you, you are a true jedi!</p>
             </> :
             <>
              <h2>Game over!</h2>
              <p>Your score is {clicked.length} {clicked.length === bestScore ? 'and it is your best score!' : `, your best score was ${bestScore}.`}</p>
            </>
          }  
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  ModalContent.propTypes = {
    onClose: PropTypes.func.isRequired,
  }

  function handleCloseButton() {
    setClicked([]);
    setShowModal(false);
  }

  return (
    <>
      <Score score={clicked.length} bestScore={bestScore} />
      <p className="description">Welcome to the Star Wars Memory Card game! click on images to earn point, but be careful not to click on the same image twice, the path to the dark side it is!</p>
      <div className="content">
        {displayedMovies.map(movie => {
        return <Card key={movie.id} id={movie.id} poster={movie.poster_path} title={movie.title} onClick={handleCardClick}/>
        })}
      </div>
      <div>
        {showModal && createPortal(
          <ModalContent onClose={handleCloseButton}/>,
          document.body
      )}
      </div>
    </>
  );
}
