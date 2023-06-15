import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from 'react-router-dom';
import EditFormMain from '../EditFormMain/EditFormMain';
import ButtonText from '../ButtonText/ButtonText';
import ButtonTextRed from '../ButtonTextRed/ButtonTextRed';
import InputsInternal from '../InputsInternal/InputsInternal'


function Profile({
  onUpdateUser,
  onLogOut,
  message='При обновлении профиля произошла ошибка.' }) {

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const [isValid, setIsValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function handleEdit() {
    setIsEditMode(!isEditMode);
  };

  function handleChageName(e) {
    setName(e.target.value);
  };

  function handleChageEmail(e) {
    setEmail(e.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    setIsEditMode(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      email
    });
    setIsEditMode(false);
  };

  return(
    <section className='profile'>
      <EditFormMain
        title={`Привет, ${currentUser.name}!`}
        name='profile'
        onSubmit={handleSubmit}
        message={message}
        buttinIsHidden={isEditMode}
        buttonIsDisabled={isValid}
        titleMod='profile__title'
        messageMod='profile__message'

      >
        <InputsInternal>
          <label className="inputs-internal__input-label">
            <span className='inputs-internal__input-name' >Имя</span>
            <input
              className="inputs-internal__input internal-inputs_kind_name"
              placeholder=""
              type="text"
              name="profile-name"
              id="profile-name"
              required
              minLength="2"
              maxLength="40"
              value={name || ''}
              onChange={handleChageName}
              disabled={!isEditMode}
            />
          </label>
          <label className="inputs-internal__input-label" >
            <span className='inputs-internal__input-name' >E-mail</span>
            <input
              className="inputs-internal__input internal-inputs_kind_user-email"
              placeholder=""
              type="email"
              name="user-email"
              id="user-email"
              required
              minLength="5"
              maxLength="30"
              value={email || ''}
              onChange={handleChageEmail}
              disabled={!isEditMode}
            />
          </label>
        </InputsInternal>

        <div className='profile__actions-container'>
          { !isEditMode &&
            <>
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
            </>}
        </div>
      </EditFormMain>
    </section>
  );
}
export default Profile;
