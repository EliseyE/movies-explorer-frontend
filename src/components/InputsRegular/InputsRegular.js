import React from 'react';
import './InputsRegular.css';

function InputsRegular({
  children,
  showExample,
  fieldsetMod=''
}) {

  return(
    <fieldset className={`inputs-regular ${fieldsetMod}`} >
      {showExample &&
        <label className='inputs-regular__input-label' >
          <span className='inputs-regular__input-name' >Input name</span>
          <input
            className="inputs-regular__input inputs-regular__input_kind_example"
            placeholder="This input is example"
            type="text"
            name="inputs-regular-example"
            id="inputs-regular-example"
          />
        </label> }
        {children}
    </fieldset>
  );
}
export default InputsRegular;
