import React, { useEffect } from 'react';
import './SearchForm.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ButtonBlueEllipse from '../ButtonBlueEllipse/ButtonBlueEllipse';
import { useState } from 'react';
import { useValidation } from "../../utils/validation";

import imagePath from '../../images/icons/lens-ico.svg'

function SearchForm({
  placeholder='',
  name='default',
  searchMovies,
  formMod='',
  sumbitButtonMod='',
  setSearchFilter,
  filterState={},
  searchQueryState='',
  message='',
  isLoading
  }) {
    const [moviesFilterState, setIsMoviesFilterState] = useState(filterState);
    const [isValidationMessageActive, setIsValidationMessageActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchQueryState);

    const valid = useValidation(searchQuery,  {isAnySymbol: true});

  function handleSubmit(e) {
    e.preventDefault();
    if (valid.isValidCustom) {
      searchMovies(searchQuery);
      console.log(valid.isValidCustom, searchQuery); }
    else setIsValidationMessageActive(true);
  };

  function handleToggleSwitch(isActive) {
    setIsMoviesFilterState({ ...moviesFilterState, shortMovies: isActive });
  };

  function handleFocus() {
    setIsValidationMessageActive(false);
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
      noValidate={true}
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
              disabled={isLoading}
              onFocus={handleFocus}
              />
            <span className="search-form__input-error search-moveis-error">{(!valid.isValidCustom && isValidationMessageActive) && valid.errorMessage}</span>
          </label>
        </fieldset>
        <ButtonBlueEllipse
          text='Найти'
          buttonType='submit'
          buttonMod={`search-form__search-button ${sumbitButtonMod}`}
          isDisabled={isLoading}
        />
        <span className='search-form__line' />
      </div>

      <div className='search-form__filter'>
          <ToggleSwitch name='Короткометражки' isDefaultState={moviesFilterState.shortMovies} onToggle={handleToggleSwitch} />
          <span className='search-form__filter-title' >Короткометражки</span>
      </div>
      {/* <span className={`search-form__message user-email-error ${email.isHighlighted && 'inputs-internal__input-error_highlighted'}`}>
        {message}
      </span> */}
    </form>
  );
}
export default SearchForm;
