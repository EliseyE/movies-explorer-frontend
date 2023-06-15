import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import InputsRegular from '../InputsRegular/InputsRegular';

function Login({ onLogIn, message='Что-то пошло не так...' }) {

  const navigate = useNavigate();


  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onLogIn({ password: password.current.value, email: email.current.value });
  };

  return(
    <section className='login'>
      <HelloPage
        singleMenuText='Ещё не зарегистрированы?'
        singleMenuLink='/signup'
        singleMenuLinkText='Регистрация'
      >
        <EditFormMain
          title='Рады видеть!'
          name='login'
          onSubmit={handleSubmit}
          message={message}
          formMod='edit-form__place_login'
          buttonText='Войти'
        >
          <InputsRegular>
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
export default Login;
