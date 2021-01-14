class FormValidator {
    constructor(settings, formElem) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElem = formElem;
    }
    _showError(input) {
        const formError = this._formElem.querySelector(`#${input.id}-error`);
        const message = input.validationMessage;
        formError.textContent = message;
        formError.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);

    }
    _hideError(input) {
        const formError = this._formElem.querySelector(`#${input.id}-error`);
        formError.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
        formError.textContent = '';
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);

        } else {
            this._showError(input);

        }
    }
    _toggleButtonState(inputs, button) {
        const isFormValid = inputs.every((input) => {
            return input.validity.valid
        })
        if (isFormValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }
    _setEventListeners() {
        const inputs = [...this._formElem.querySelectorAll(this._inputSelector)];
        const button = this._formElem.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputs, button);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                //check validity
                this._checkInputValidity(input);
                //change button state
                this._toggleButtonState(inputs, button);

            })
        })
    }


    enableValidation() {
        this._formElem.addEventListener('submit', e => {
            e.preventDefault();

        });
        this._setEventListeners();

    }


}



export default FormValidator;