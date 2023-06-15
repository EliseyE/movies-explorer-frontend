import React, { useState } from 'react';
import './Register.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import RegularInputs from '../RegularInputs/RegularInputs';

function Register({ message='Что-то пошло не так...' }) {

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    // onRegisterUser({
    //   name,
    //   email,
    //   password
    // });
  };

  return(
    <section className='register'>
      <HelloPage
        singleMenuText='Уже зарегистрированы?'
        singleMenuLink='/signin'
        singleMenuLinkText='Войти'
      >
        <EditFormMain
          title='Добро пожаловать!'
          name='register'
          onSubmit={handleSubmit}
          message={message}
          formMod='edit-form__place_register'
          buttonText='Зарегистрироваться'
        >
          <RegularInputs>
            <label className="regular-inputs__input-label">
              <span className='regular-inputs__input-name' >Имя</span>
              <input
                className={`regular-inputs__input profile__input_kind_name ${!isNameValid && 'regular-inputs__input_invalid'}`}
                placeholder=""
                type="text"
                name="profile-name"
                id="profile-name"
                required
                minLength="2"
                maxLength="40"
                // value={name || ''}
                // onChange={handleChageName}
              />
            </label>
            <label className="regular-inputs__input-label" >
              <span className='regular-inputs__input-name' >E-mail</span>
              <input
                className={`regular-inputs__input profile__input_kind_user-email ${!isEmailValid && 'regular-inputs__input_invalid'}`}
                placeholder=""
                type="email"
                name="user-email"
                id="user-email"
                required
                minLength="5"
                maxLength="30"
                // value={email || ''}
                // onChange={handleChageEmail}
              />
              </label>
              <label className="regular-inputs__input-label">
              <span className='regular-inputs__input-name' >Пароль</span>
                <input
                  className={`regular-inputs__input profile__input_kind_user-password ${!isPasswordValid && 'regular-inputs__input_invalid'}`}
                  placeholder=""
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength="4"
                  maxLength="30"
                // ref={password}
                />
            </label>
          </RegularInputs>
        </EditFormMain>
      </HelloPage>
    </section>
  );
}
export default Register;
