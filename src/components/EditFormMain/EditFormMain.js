import React from 'react';
import './EditFormMain.css';
import ButtonBlue from '../ButtonBlue/ButtonBlue'

function EditFormMain({
  children,
  title,
  name,
  onSubmit,
  formMod='',
  titleMod='Название формы',
  buttonIsDisabled,
  message='',
  messageMod='',
  buttonMod='',
  buttonText='Сохранить',
  buttinIsHidden=true

  }) {

  return(
    <form
      onSubmit={onSubmit}
      className={`edit-form-main edit-form-main_type_${name} ${formMod}`}
      name={`edit-form-main_type_${name}`}
      noValidate
    >
      <div className='edit-form-main__containder'>
      <h2 className={`edit-form-main__title ${titleMod}`}>{title}</h2>
        {children}
      {buttinIsHidden && message && <span className={`edit-form-main__message ${messageMod}`} >{message}</span>}
      </div>
      {buttinIsHidden &&
        <ButtonBlue
          text={buttonText}
          buttonType='submit'
          buttonMod={`edit-form-main__button ${buttonMod}`}
          isDisabled={buttonIsDisabled}
        /> }
    </form>
  );
}

export default EditFormMain;
