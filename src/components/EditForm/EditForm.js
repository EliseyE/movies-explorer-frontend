import React from 'react';
import './EditForm.css';

function EditForm({ title, name, children, onSubmit,
  formMod='', titleMod='' }) {

  return(
    <form
      onSubmit={onSubmit}
      className={`edit-form edit-form_type_${name}
      ${formMod}`}
      name={`edit-form_type_${name}`}
    >
      <h2 className={`edit-form__title ${titleMod}`}>{title}</h2>
      {children}
    </form>
  );
}

export default EditForm;
