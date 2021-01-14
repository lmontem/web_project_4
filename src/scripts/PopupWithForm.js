import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;

    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;

    }
    setEventListeners() {
        super.setEventListeners();
        this._form = this._popupElement.querySelector('.popup__form');
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;