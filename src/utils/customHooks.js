import { useState, useEffect } from "react";
import { useValidation } from "./validation";

const useValidInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const [isBlured, setIsBlured] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const valid = useValidation(value, validations);

  function onChange(e) {
    setValue(e.target.value);
    setValidationMessage(e.target.validationMessage);
    setDirty(true);
  };

  function onBlur() {
    setIsBlured(true);
  };

  useEffect(() => {
    if(isDirty) {
      setIsValid(((validationMessage === '') && valid.isValidCustom) ? true : false);
      setValidationMessage(validationMessage !== '' ? validationMessage : valid.errorMessage);
    }
  }, [value, isDirty, valid, validationMessage]);

  useEffect(() => {
    setIsHighlighted(!isValid && isBlured);
  }, [isBlured, isValid]);


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
    valid
  };
};

export {
  useValidInput,
};
