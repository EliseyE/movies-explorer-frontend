import React, { useEffect } from 'react';
import './MoviesCard.css';
import ButtonGreyEllipse from '../ButtonGreyEllipse/ButtonGreyEllipse';
import ButtonImgCrossRound from '../ButtonImgCrossRound/ButtonImgCrossRound';
import ButtonImgCheckedRed from '../ButtonImgCheckedRed/ButtonImgCheckedRed';
import { useState } from 'react';

function MoviesCard({
    movie={
      trailer: '',
      image: '',
      nameRU: 'Фильм',
      duration: 0
    },
    onMovieSave,
    onMovieSavedDelete,
    moviesCardTypeSaved=false,
    }) {

  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [movieCard, setMovieCard] = useState({});

  function handleSaveClick() {
    onMovieSave(movieCard);
  }

  function handleDeleteClick() {
    onMovieSavedDelete(movieCard._id);
  }

  useEffect(() => {
    setIsMovieSaved(movie._id ? true : false);
    setMovieCard(movie);
  }, [movie]);

  return(
    <li className='movies-card'>
      <div className='movies-card__overlay'>
      <div className='movies-card__buttons-container'>
        { !moviesCardTypeSaved &&
          <>
            { !isMovieSaved && <ButtonGreyEllipse
              text='Сохранить'
              onClick={handleSaveClick}
              buttonMod='movies-card__save-button' /> }

            { isMovieSaved && <ButtonImgCheckedRed
              onClick={handleDeleteClick}
              buttonMod='movies-card__saved-button' /> }
          </>
        }
        { moviesCardTypeSaved && <ButtonImgCrossRound ButtonImgCrossRoundMod='movies-card__delete-button' onClick={handleDeleteClick} />}
      </div>
        <a href={movieCard.trailer} target='_blank' rel="noreferrer" className='movies-card__link' >
          <div className='movies-card__preview-img'>
            <img src={movieCard.image}
              alt={movieCard.nameRU}
              className="movies-card__image"
            />
          </div>
        </a>
      </div>
      <div className="movies-card__info">
        <h2 className="movies-card__name">{movieCard.nameRU}</h2>
        <span className="movies-card__duration">
          { movieCard.duration < 60 && `${movieCard.duration}м` }

          {movieCard.duration >= 60 &&
            `${Math.floor(movieCard.duration/60)}ч ${movieCard.duration - 60*Math.floor(movieCard.duration/60) }м`
          }
        </ span>
      </div>
    </li>
  );
}
export default MoviesCard;
