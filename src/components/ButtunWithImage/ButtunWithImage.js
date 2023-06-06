import React from 'react';
import './ButtunWithImage.css';

function ButtunWithImage({imagePath = '', onClick=undefined, buttonWithImageMod=''}) {

  return(
    <button
      className={`button-with-image ${buttonWithImageMod}`}
      style={{ backgroundImage: `url('${imagePath}')` }}
      onClick={onClick}>
    </button>
  );
}

export default ButtunWithImage;
