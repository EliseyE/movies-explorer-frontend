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
  buttonIsActive=false,
  message='',
  messageMod='',
  buttonMod='',
  buttonText='Сохранить'
  }) {

  return(
    <form
      onSubmit={onSubmit}
      className={`edit-form-main edit-form-main_type_${name} ${formMod}`}
      name={`edit-form-main_type_${name}`}
    >
      <div className='edit-form-main__containder'>
      <h2 className={`edit-form-main__title ${titleMod}`}>{title}</h2>
        {children}
        <span className={`edit-form-main__message ${messageMod}`} >{message}</span>
      </div>
      <ButtonBlue
        text={buttonText}
        buttonType='submit'
        buttonMod={`edit-form-main__button ${buttonMod}`}
        isDisabled={buttonIsActive}
      />
    </form>
  );
}

export default EditFormMain;
