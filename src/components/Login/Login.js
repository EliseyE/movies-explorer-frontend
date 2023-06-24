import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import InputsRegular from '../InputsRegular/InputsRegular';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { useValidInput } from '../../utils/customHooks';


function Login({ onLogIn, message }) {

  const isLoading = useContext(IsLoadingContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const email = useValidInput('', {isEmail: true});
  const password = useValidInput('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogIn({ password: password.value, email: email.value });
  };

  useEffect(() => {
    console.log(email.isValid, password.isValid);
      setIsButtonDisabled(!(email.isValid && password.isValid))
  }, [email.isValid, password.isValid]);


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
          buttonText={isLoading ? 'Вход...' : 'Войти'}
          buttonIsDisabled={isButtonDisabled}
        >
          <InputsRegular>
            <label className="inputs-regular__input-label" >
              <span className='inputs-regular__input-name' >E-mail</span>
              <input
                className={`inputs-regular__input profile__input_kind_user-email ${email.isHighlighted && 'inputs-regular__input_invalid'}`}
                placeholder=""
                type="email"
                name="user-email"
                id="user-email"
                required
                minLength="5"
                maxLength="30"
                onChange={email.onChange}
                onBlur={email.onBlur}
              />
              <span className={`inputs-regular__input-error user-email-error ${email.isHighlighted && 'inputs-regular__input-error_highlighted'}`}>
                {email.validationMessage}
              </span>
            </label>
            <label className="inputs-regular__input-label">
              <span className='inputs-regular__input-name' >Пароль</span>
              <input
                className={`inputs-regular__input profile__input_kind_user-password ${password.isHighlighted && 'inputs-regular__input_invalid'}`}
                placeholder=""
                type="password"
                name="password"
                id="password"
                required
                minLength="4"
                maxLength="30"
                onChange={password.onChange}
                onBlur={password.onBlur}
              />
              <span className={`inputs-regular__input-error user-password-error ${password.isHighlighted && 'inputs-regular__input-error_highlighted'}`}>
                {password.validationMessage}
              </span>
            </label>
          </InputsRegular>
        </EditFormMain>
      </HelloPage>
    </section>
  );
}
export default Login;
