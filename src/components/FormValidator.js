class FormValidator {
    constructor(settings, formElem) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElem = formElem;
        this._inputs = [...this._formElem.querySelectorAll(this._inputSelector)];
        this._button = this._formElem.querySelector(this._submitButtonSelector);
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
    _toggleButtonState() {
        const isFormValid = this._inputs.every((input) => {
            return input.validity.valid
        })
        if (isFormValid) {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        }
    }
    _setEventListeners() {
        
        this._toggleButtonState();
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                //check validity
                this._checkInputValidity(input);
                //change button state
                this._toggleButtonState();

            })
        })
    }
    resetValidation() {
        this._inputs.forEach(input => {
            this._hideError(input)
        })
        this._toggleButtonState();
    }

    enableValidation() {
        this._formElem.addEventListener('submit', e => {
            e.preventDefault();

        });
        this._setEventListeners();

    }


}



export default FormValidator;