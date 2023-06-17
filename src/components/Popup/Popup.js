import React from "react";
import './Popup.css';
import ButtonImgCross from '../ButtonImgCross/ButtonImgCross';

function Popup({ name='standart', children, isOpen, onClose, popupMod='', popupCloseButtonMod='' }) {

  const classPopup=`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''} ${popupMod}`

  return(
    <section
      className={classPopup}
      onMouseDown={onClose}
    >
      <div className="popup__container" onMouseDown={e => e.stopPropagation()}>
        <ButtonImgCross
          buttonImgCrossMod={`button-img-cross_place_popup ${popupCloseButtonMod}`}
          onClick={onClose}
        />
        {children}
      </div>
  </section>
  );
}

export default Popup;
