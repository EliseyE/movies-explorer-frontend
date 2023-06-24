import { useState, useEffect } from "react";

const useValidation = (value , validations) => {
  const [isValidCustom, setIsValidCustom] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    for (const validation in validations) {
      switch(validation) {
        case 'isEmail':
          // const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          const regExpEmail = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          // const regExpEmail = /A[a-z]{2,20}@[a-z]{2,20}\.[a-z]{1,5}/gi;
          regExpEmail.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true);
          setErrorMessage(isEmail ? 'Введите почту в формете user@user.com' : '' );
          break;

          default:
            break;
      };
    }
  }, [value, isEmail, errorMessage, validations]);

  useEffect(() => {
    setIsValidCustom(!isEmail)
  }, [isEmail]);

  return {
    isValidCustom,
    isEmail,
    errorMessage,
  }
};

export {
  useValidation,
};
