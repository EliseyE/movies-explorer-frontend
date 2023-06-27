import { useState, useEffect } from "react";

const useValidation = (value , validations) => {
  const [isValidCustom, setIsValidCustom] = useState(false);
  const [isEmail, setIsEmail] = useState({ isValid: false, message: '' });
  const [isPassword, setIsPassword] = useState({ isValid: false, message: '' });
  const [isName, setIsName] = useState({ isValid: false, message: '' });
  const [isAnySymbol, setIsAnySymbol] = useState({ isValid: false, message: '' });
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    for (const validation in validations) {
      switch(validation) {
        case 'isEmail':
          const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
          const regExpName = /^[a-zA-Zа-яА-ЯёЁ]([ ]?[a-zA-Zа-яА-ЯёЁ0-9-\_\.\-]){1,29}$/;
          regExpName.test(String(value).toLowerCase())
          ? setIsName({...isName , isValid: false, message: ''})
          : setIsName({...isName , isValid: true, message: 'Введены недопустимые символы ' });
          break;

          case 'isAnySymbol':
          const regExpAnySymbol = /^[a-zA-Zа-яА-ЯёЁ]{1,30}$/;
          regExpAnySymbol.test(String(value).toLowerCase())
          ? setIsAnySymbol({...isAnySymbol , isValid: false, message: ''})
          : setIsAnySymbol({...isAnySymbol , isValid: true, message: 'Нужно ввести ключевое слово ' });
          break;

        default:
          break;
      };
    }
  }, [value]);

  useEffect(() => {
    setIsValidCustom(!isEmail.isValid && !isPassword.isValid && !isName.isValid && !isAnySymbol.isValid)
    setErrorMessage(`${isEmail.message}${isPassword.message}${isName.message}${isAnySymbol.message}`)
  }, [value, isEmail, isPassword, isName, isAnySymbol]);

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
