import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;

    }
    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;

    }
    setEventListeners() {
        super();
        this._popupElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    close() {
        super();
        this._popupElement.reset();
    }
}

export default PopupWithForm;