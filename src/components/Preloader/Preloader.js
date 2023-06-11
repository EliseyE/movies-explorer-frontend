import React from "react";
import './Preloader.css';

function Preloader({ preloaderMod='', preloaderWheelMod='' }) {

  return(
    <div className={`preloader ${preloaderMod}`}>
      <div className={`preloader__wheel ${preloaderWheelMod}`} />
    </div>
  );
}

export default Preloader;
