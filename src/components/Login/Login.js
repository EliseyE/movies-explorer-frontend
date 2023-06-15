import React, { useState } from 'react';
import './Login.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import RegularInputs from '../RegularInputs/RegularInputs';

function Login({ message='Что-то пошло не так...' }) {

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
          <RegularInputs>
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
export default Login;
