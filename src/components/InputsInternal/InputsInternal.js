import React from 'react';
import './InputsInternal.css';

function InputsInternal({
  children,
  showExample,
  fieldsetMod=''
}) {

  return(
    <fieldset className={`inputs-internal ${fieldsetMod}`} >
      {showExample &&
        <label className='inputs-internal__input-label' >
          <span className='inputs-internal__input-name' >Input name</span>
          <input
            className="inputs-internal__input inputs-internal__input_kind_example"
            placeholder="This input is example"
            type="text"
            name="inputs-internal-example"
            id="inputs-internal-example"
          />
          <span className={`inputs-internal__input-error user-email-error ${'name.isHighlighted' && 'inputs-internal__input-error_highlighted'}`}>
            {`Сообщение валидации name.validationMessage`}
          </span>
        </label> }
        {children}
    </fieldset>
  );
}
export default InputsInternal;
