import React, { useEffect } from 'react';
import './SearchForm.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ButtonBlueEllipse from '../ButtonBlueEllipse/ButtonBlueEllipse';
import { useState } from 'react';

import imagePath from '../../images/icons/lens-ico.svg'

function SearchForm({
  placeholder='',
  name='default',
  searchMovies,
  formMod='',
  sumbitButtonMod='',
  setSearchFilter,
  filterState={},
  searchQueryState=''
  }) {

  const [moviesFilterState, setIsMoviesFilterState] = useState(filterState);
  const [searchQuery, setSearchQuery] = useState(searchQueryState);

  function handleSubmit(e) {
    e.preventDefault();
    if(searchQuery !== '') searchMovies(searchQuery);
  };

  function handleToggleSwitch(isActive) {
    setIsMoviesFilterState({ ...moviesFilterState, shortMovies: isActive });
  };

  function handleSetSearchQuery(e) {
    setSearchQuery(e.target.value)
  };

  useEffect(() => {
    setSearchFilter(moviesFilterState);
  }, [moviesFilterState]);


  return(
    <form
      onSubmit={handleSubmit}
      className={`search-form search-form_type_${name} ${formMod}`}
      name={`search-form_type_${name}`}
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
              type="search"
              name="find-moveis"
              id="find-moveis"
              required
              onChange={handleSetSearchQuery}
              value={searchQuery || ''}
              />
            <span className="search-form__input-error find-moveis-error"></span>
          </label>
        </fieldset>
        <ButtonBlueEllipse text='Найти' buttonType='submit' buttonMod='search-form__search-button'/>
        <span className='search-form__line' />
      </div>

      <div className='search-form__filter'>
          <ToggleSwitch name='Короткометражки' isDefaultState={moviesFilterState.shortMovies} onToggle={handleToggleSwitch} />
          <span className='search-form__filter-title' >Короткометражки</span>
      </div>
    </form>
  );
}
export default SearchForm;
