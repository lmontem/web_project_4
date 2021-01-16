class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupElement.classList.add('popup__opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove('popup__opened');
        document.removeEventListener('keydown', this._handleEscClose);

    }
    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }

    }
    setEventListeners() {
        this._popupElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__close-btn') || e.target.classList.contains('popup__opened')) {
                this.close();
            }
        })

    }
}

export default Popup;
/*popup open function

function openPopup(popup) {
    popup.classList.add('popup__opened');

    document.addEventListener('keydown', closeOnEscape);
    popup.addEventListener('click', overlayClose);
}

//popup close function
function closePopup(popup) {
    popup.classList.remove('popup__opened');

    document.removeEventListener('keydown', closeOnEscape);
    popup.removeEventListener('click', overlayClose);

}

//function for escape key close
function closeOnEscape(e) {
    if (e.key === "Escape") {
        const currentPopup = document.querySelector('.popup__opened');
        closePopup(currentPopup);
    }
}
//function for overlay close
function overlayClose(e) {

    if (e.target.classList.contains('popup__opened')) {
        closePopup(e.target);
    }
}

*/