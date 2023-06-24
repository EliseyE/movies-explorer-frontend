import { useState, useEffect } from "react";
import { useValidation } from "./validation";

const useValidInput = (initialValue, adjusts, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [isBlured, setIsBlured] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);


  const [validationMessage, setValidationMessage] = useState('');
  const [validationBrowserMessage, setValidationBrowserMessage] = useState('');

  const valid = useValidation(value, validations);

  function onChange(e) {
    setValidationMessage('');
    setValue(e.target.value);
    setValidationBrowserMessage(e.target.validationMessage);
    setDirty(true);
  };

  function onBlur() {
    setIsBlured(true);
  };

  useEffect(() => {
    if(true) {
      setValidationMessage('');
      setIsValid(((validationBrowserMessage === '') && valid.isValidCustom) ? true : false);
      setValidationMessage(validationBrowserMessage !== '' ? validationBrowserMessage : valid.errorMessage);
    }
  }, [value, isDirty, valid, validationMessage]);

  useEffect(() => {
    setIsHighlighted(!isValid && isBlured);
  }, [isBlured, isValid]);

  useEffect(() => {
    if(adjusts.isNotEmpty) setIsBlured(true);
  }, []);

  return {
    isEmail: valid.isEmail,
    value,
    isDirty,
    isBlured,
    isValid,
    validationMessage,
    isHighlighted,
    onChange,
    onBlur,
    setValue,
    valid
  };
};

export {
  useValidInput,
};
