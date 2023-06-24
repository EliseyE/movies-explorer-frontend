import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditFormMain from '../EditFormMain/EditFormMain';
import ButtonText from '../ButtonText/ButtonText';
import ButtonTextRed from '../ButtonTextRed/ButtonTextRed';
import InputsInternal from '../InputsInternal/InputsInternal'
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import Preloader from '../Preloader/Preloader';
import { useValidInput } from '../../utils/customHooks';

function Profile({
  onUpdateUser,
  onLogOut,
  message='' }) {

  const currentUser = useContext(CurrentUserContext);
  const isLoading = useContext(IsLoadingContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const name = useValidInput('', {isName: true}, {isNotEmpty: true});
  const email = useValidInput('', {isEmail: true});

  function handleEdit() {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    name.setValue(currentUser.name);
    email.setValue(currentUser.email);
  }, []);

  useEffect(() => {
    setIsEditMode(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name.value,
      email: email.value
    });
  };

  useEffect(() => {
    if(!isLoading) setIsEditMode(false);
  }, [isLoading]);

  useEffect(() => {
    setIsButtonDisabled(!(email.isValid && name.isValid))
}, [email.isValid, name.isValid]);

  return(
    <section className='profile'>
      <EditFormMain
        title={`Привет, ${currentUser.name}!`}
        name='profile'
        onSubmit={handleSubmit}
        message={message}
        buttinIsHidden={isEditMode}
        titleMod='profile__title'
        messageMod='profile__message'
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить' }
        buttonIsDisabled={isButtonDisabled}

      >
        <InputsInternal>
          <label className="inputs-internal__input-label">
            <span className='inputs-internal__input-name' >Имя</span>
            <input
              className={`inputs-internal__input internal-inputs_kind_name ${name.isHighlighted && 'inputs-internal__input_invalid'}`}
              placeholder=""
              type="text"
              name="profile-name"
              id="profile-name"
              required
              minLength="2"
              maxLength="30"
              value={name.value || ''}
              onChange={name.onChange}
              onBlur={name.onBlur}
              disabled={!isEditMode}
            />
            <span className={`inputs-internal__input-error user-email-error ${name.isHighlighted && 'inputs-internal__input-error_highlighted'}`}>
              {name.validationMessage}
            </span>
          </label>
          <label className="inputs-internal__input-label" >
            <span className='inputs-internal__input-name' >E-mail</span>
            <input
              className={`inputs-internal__input internal-inputs_kind_user-email ${email.isHighlighted && 'inputs-internal__input_invalid'}`}
              placeholder=""
              type="email"
              name="user-email"
              id="user-email"
              required
              minLength="5"
              maxLength="30"
              value={email.value || ''}
              onChange={email.onChange}
              onBlur={email.onBlur}
              disabled={!isEditMode}
            />
            <span className={`inputs-internal__input-error user-email-error ${email.isHighlighted && 'inputs-internal__input-error_highlighted'}`}>
              {email.validationMessage}
            </span>
          </label>
        </InputsInternal>

        { !isEditMode && !isLoading &&
          <div className='profile__actions-container'>
            <ButtonText
              text='Редактировать'
              onClick={handleEdit}
              buttonMod='profile__button-text'
            />
            <ButtonTextRed
              text='Выйти из аккаунта'
              onClick={onLogOut}
              buttonMod='profile__button-text'
              />
          </div>}
      </EditFormMain>
      {isLoading && <div className='profile__preloader-container'><Preloader /></div> }
    </section>
  );
}
export default Profile;
