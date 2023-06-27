import React from "react";
import './PopupResult.css';
import Popup from "../Popup/Popup";

function PopupResult({isOpen, onClose, message='Информация' , image}) {

  return(
    <Popup name={'popup-result'} isOpen={isOpen} onClose={onClose}>
      <div className="popup-result">
        <img
          src={image}
          alt="Информирующий знак"
          className="popup-result__image popup-result__image_size_normal"
        />
        <h1 className="popup-result__message">
          {message}
        </h1>
      </div>
    </Popup>
  );
}

export default PopupResult;
