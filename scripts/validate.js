function hideError(input, settings) {
    const formError = document.querySelector(`#${input.id}-error`);
    formError.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputErrorClass);
    formError.textContent = '';
}

function showError(input, settings) {
    const formError = document.querySelector(`#${input.id}-error`);
    const message = input.validationMessage;
    formError.textContent = message;
    formError.classList.add(settings.errorClass);
    input.classList.add(settings.inputErrorClass);

}

function checkInputValidity(input, settings) {
    if (input.validity.valid) {
        hideError(input, settings);

    } else {
        showError(input, settings);

    }
}

function toggleButtonState(inputs, button, settings) {
    const isFormValid = inputs.every((input) => {
        return input.validity.valid
    })
    if (isFormValid) {
        button.classList.remove(settings.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(settings.inactiveButtonClass);
        button.disabled = true;
    }
}


function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

        });
        const inputs = [...form.querySelectorAll(settings.inputSelector)];
        const button = form.querySelector(settings.submitButtonSelector);
        toggleButtonState(inputs, button, settings);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                //check validity
                checkInputValidity(input, settings);
                //change button state
                toggleButtonState(inputs, button, settings);

            })
        })
    })
}

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation(settings);