import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._source = this._popupElement.querySelector('.popup__image');
        this._info =  this._popupElement.querySelector('.popup__image-title');
    }
    open(caption, link) {
        super.open();
        this._source.src = link;
        this._info.textContent = caption;
    }
}

export default PopupWithImage;