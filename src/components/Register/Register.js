import React, { useState, useEffect, useContext } from 'react';
import './Register.css';
import HelloPage from '../HelloPage/HelloPage';
import EditFormMain from '../EditFormMain/EditFormMain';
import InputsRegular from '../InputsRegular/InputsRegular';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { useValidInput } from '../../utils/customHooks';

function Register({ onRegister, message='' }) {
  const [isRequest, setIsRequest] = useState(false);

  const name = useValidInput('', {isName: true}, {});
  const email = useValidInput('', {isEmail: true}, {});
  const password = useValidInput('', {isPassword: true}, {});

  const isLoading = useContext(IsLoadingContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    await onRegister({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    setIsRequest(true);
  };

  useEffect(() => {
    setIsButtonDisabled(!(name.isValid && email.isValid && password.isValid))
}, [email.isValid, password.isValid, name.isValid]);

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
          message={isRequest && message}
          formMod='edit-form__place_register'
          buttonText={isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          buttonIsDisabled={isButtonDisabled}
        >
          <InputsRegular>
            <label className="inputs-regular__input-label">
              <span className='inputs-regular__input-name' >Имя</span>
              <input
                className={`inputs-regular__input profile__input_kind_name ${name.isHighlighted && 'inputs-regular__input_invalid'}`}
                placeholder=""
                type="text"
                name="profile-name"
                id="profile-name"
                required
                minLength="2"
                maxLength="30"
                onChange={name.onChange}
                onBlur={name.onBlur}
              />
              <span className={`inputs-regular__input-error user-email-error ${name.isHighlighted && 'inputs-regular__input-error_highlighted'}`}>
                {name.validationMessage}
              </span>
            </label>
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
export default Register;
