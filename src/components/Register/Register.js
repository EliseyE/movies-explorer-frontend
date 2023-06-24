import React, { useState, useRef, useContext } from 'react';
import './Register.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import InputsRegular from '../InputsRegular/InputsRegular';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';

function Register({ onRegister, message='Что-то пошло не так...' }) {

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const isLoading = useContext(IsLoadingContext);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);




  async function handleSubmit(e) {
    e.preventDefault();
    await onRegister({
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    });
  }

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
          buttonText={isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
        >
          <InputsRegular>
            <label className="inputs-regular__input-label">
              <span className='inputs-regular__input-name' >Имя</span>
              <input
                className={`inputs-regular__input profile__input_kind_name ${!isNameValid && 'inputs-regular__input_invalid'}`}
                placeholder=""
                type="text"
                name="profile-name"
                id="profile-name"
                required
                minLength="2"
                maxLength="40"
                ref={name}
              />
            </label>
            <label className="inputs-regular__input-label" >
              <span className='inputs-regular__input-name' >E-mail</span>
              <input
                className={`inputs-regular__input profile__input_kind_user-email ${!isEmailValid && 'inputs-regular__input_invalid'}`}
                placeholder=""
                type="email"
                name="user-email"
                id="user-email"
                required
                minLength="5"
                maxLength="30"
                ref={email}
              />
              </label>
              <label className="inputs-regular__input-label">
              <span className='inputs-regular__input-name' >Пароль</span>
                <input
                  className={`inputs-regular__input profile__input_kind_user-password ${!isPasswordValid && 'inputs-regular__input_invalid'}`}
                  placeholder=""
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength="4"
                  maxLength="30"
                ref={password}
                />
            </label>
          </InputsRegular>
        </EditFormMain>
      </HelloPage>
    </section>
  );
}
export default Register;
