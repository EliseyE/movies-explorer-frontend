import React, { useEffect, useRef } from 'react';
import './SearchForm.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ButtonBlueEllipse from '../ButtonBlueEllipse/ButtonBlueEllipse';
import { useState } from 'react';

import imagePath from '../../images/icons/lens-ico.svg'

function SearchForm({ placeholder='', name='default', searchMovies, formMod='', sumbitButtonMod='', setSearchFilter }) {

  const searchQuery = useRef();

  const [moviesFilterState, setIsMoviesFilterState] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if(searchQuery.current.value !== '') searchMovies(searchQuery.current.value);
  };

  function handleToggleSwitch(isActive) {
    setIsMoviesFilterState({ ...moviesFilterState, shortMovies: isActive });
  };

  useEffect(() => {
    setSearchFilter(moviesFilterState);
  }, [moviesFilterState]);


  return(
    <form
      onSubmit={handleSubmit}
      className={`search-form search-form_type_${name} ${formMod}`}
      name={`search-form_type_${name}`}
      noValidate
    >
      <div className='search-form__conteiner'>
        <div
          className='search-form__image'
          style={{ backgroundImage: `url('${imagePath}')` }}>
        </div>
        <fieldset className="search-form__input-container">
          <label className="search-form__input-label">
            <input
              className="search-form__input search-form__input_kind_find-moveis"
              placeholder={placeholder}
              type="text"
              name="find-moveis"
              id="find-moveis"
              required
              ref={searchQuery}
              />
            <span className="search-form__input-error find-moveis-error"></span>
          </label>
        </fieldset>
        <ButtonBlueEllipse text='Найти' buttonType='submit' buttonMod='search-form__search-button'/>
        <span className='search-form__line' />
      </div>

      <div className='search-form__filter'>
          <ToggleSwitch name='Короткометражки' isDefaultState={false} onToggle={handleToggleSwitch} />
          <span className='search-form__filter-title' >Короткометражки</span>
      </div>
    </form>
  );
}
export default SearchForm;
