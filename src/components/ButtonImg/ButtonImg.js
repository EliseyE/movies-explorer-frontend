import React from 'react';
import './ButtonImg.css';

function ButtonImg({imagePath = '', onClick=undefined, buttonImgMod='', type}) {

  return(
    <button
      className={`button-img ${buttonImgMod}`}
      style={{ backgroundImage: `url('${imagePath}')` }}
      onClick={onClick}
      type={type}
    />
  );
}

export default ButtonImg;
