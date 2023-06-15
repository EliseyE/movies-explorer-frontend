import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditForm from '../EditForm/EditForm';
import ButtonText from '../ButtonText/ButtonText';
import ButtonTextRed from '../ButtonTextRed/ButtonTextRed';
import ButtonBlue from '../ButtonBlue/ButtonBlue';


function Profile({
  onUpdateUser,
  onLogOut,
  message='' }) {

  const currentUser = useContext(CurrentUserContext);

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
  };

  return(
    <section className='profile'>
      <EditForm
        title={`Привет, ${currentUser.name}!`}
        name='profile'
        onSubmit={handleSubmit}
        message={message}
      >
        <fieldset className="profile__input-container">
          <label className="profile__input-label">
            <span className='profile__input-text' >Имя</span>
            <input
              className="profile__input profile__input_kind_name"
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
          <label className="profile__input-label" >
            <span className='profile__input-text' >E-mail</span>
            <input
              className="profile__input profile__input_kind_user-email"
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
        </fieldset>

        <span className='profile__message' >{message}</span>

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

          { isEditMode &&
            <ButtonBlue
              text='Сохранить'
              onClick={handleSubmit}
              buttonType='submit'
              buttonMod='profile__button'
              isDisabled={isValid}
            /> }
        </div>
      </EditForm>
    </section>
  );
}
export default Profile;
