import React from 'react';
import './MoviesCard.css';
import ButtonGreyEllipse from '../ButtonGreyEllipse/ButtonGreyEllipse';
import ButtonImgCrossRound from '../ButtonImgCrossRound/ButtonImgCrossRound';
import ButtonImgCheckedRed from '../ButtonImgCheckedRed/ButtonImgCheckedRed';
import { useState } from 'react';

function MoviesCard({ movie, onMovieSave, onMovieSavedDelete, moviesCardTypeSaved=false }) {

  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleSaveClick() {
    // onMovieSave(movie);
    setIsMovieSaved(true);
    console.log('Saved');
  }

  function handleDeleteClick() {
    // onMovieSavedDelete(movie);
    setIsMovieSaved(false);
    console.log('Delete from saved');
  }

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
        { isMovieSaved && moviesCardTypeSaved && <ButtonImgCrossRound ButtonImgCrossRoundMod='movies-card__delete-button' onClick={handleDeleteClick} />}
      </div>
        <a href={movie.trailerLink} target='_blank' rel="noreferrer" className='movies-card__link' >
          <img src={movie.image.url}
            alt={movie.nameRU}
            className="movie__image"
          />
        </a>
      </div>
      <div className="movie__info">
        <h2 className="movie__name">{movie.nameRU}</h2>
        <span className="movie__duration">
          {`${Math.floor(movie.duration/60)}ч ${movie.duration - 60*Math.floor(movie.duration/60) }м`}
        </ span>
      </div>




        {/* <div className="photoCard__like">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" />
          <span className="photoCard__like-counter">{card.likes.length}</span>
        </div> */}
      {/* {isOwn && <button onClick={handleTrashClick} className="photoCard__trash-button" type="button" />} */}
    </li>
  );
}
export default MoviesCard;
