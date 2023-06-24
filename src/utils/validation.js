import { useState, useEffect } from "react";

const useValidation = (value , validations) => {
  const [isValidCustom, setIsValidCustom] = useState(false);
  const [isEmail, setIsEmail] = useState({ isValid: false, message: '' });
  const [isPassword, setIsPassword] = useState({ isValid: false, message: '' });
  const [isName, setIsName] = useState({ isValid: false, message: '' });
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    for (const validation in validations) {
      switch(validation) {
        case 'isEmail':
          const regExpEmail = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          regExpEmail.test(String(value).toLowerCase())
          ? setIsEmail({...isEmail , isValid: false, message: '' })
          : setIsEmail({...isEmail , isValid: true, message: 'Введите почту в формете user@user.com ' });
          break;

          case 'isPassword':
            const regExpPassword = /^[a-zA-Z0-9!@#$%^&*]+$/;
            regExpPassword.test(String(value).toLowerCase())
            ? setIsPassword({...isPassword , isValid: false, message: ''})
            : setIsPassword({...isPassword , isValid: true, message: 'Введены недопустимые символы ' });
            break;

            case 'isName':
            const regExpName = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9-\_\.\-]{1,29}$/;
            regExpName.test(String(value).toLowerCase())
            ? setIsName({...isName , isValid: false, message: ''})
            : setIsName({...isName , isValid: true, message: 'Введены недопустимые символы ' });
            break;

          default:
            break;
      };
    }
  }, [value, isEmail.isValid, isPassword.isValid, isName.isValid]);

  useEffect(() => {
    setIsValidCustom(!isEmail.isValid && !isPassword.isValid && !isName.isValid)
    setErrorMessage(`${isEmail.message}${isPassword.message}${isName.message}`)
  }, [value, isEmail, isPassword, isName]);

  return {
    isValidCustom,
    isEmail,
    isPassword,
    errorMessage,
  }
};

export {
  useValidation,
};
