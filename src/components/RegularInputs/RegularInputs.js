import React from 'react';
import './RegularInputs.css';

function RegularInputs({
  children,
  showExample,
  fieldsetMod=''
}) {

  return(
    <fieldset className={`regular-inputs ${fieldsetMod}`} >
      {showExample &&
        <label className='regular-inputs__input-label' >
          <span className='regular-inputs__input-name' >Input name</span>
          <input
            className="regular-inputs__input regular-inputs__input_kind_example"
            placeholder="This input is example"
            type="text"
            name="regular-inputs-example"
            id="regular-inputs-example"
          />
        </label> }
        {children}
    </fieldset>
  );
}
export default RegularInputs;
