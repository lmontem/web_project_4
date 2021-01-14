import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(caption, link) {
        super.open();
        this._popupElement.querySelector('.popup__image').src = link;
        this._popupElement.querySelector('.popup__image-title').textContent = caption;
    }
}

export default PopupWithImage;