
export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-btn",
    inactiveButtonClass: "popup__save-btn_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');
const avatarPopup = document.querySelector('.popup__type_avatar');
//buttons
export const editButton = document.querySelector('.profile__edit-btn');
export const addCardBtn = document.querySelector('.profile__add-btn');
//edit form
export const editForm = editProfilePopup.querySelector('.popup__form');
export const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
export const aboutMeInput = editProfilePopup.querySelector('.popup__input_type_about');
//add form
export const addCardForm = addCardPopup.querySelector('.popup__form');
//avatar form
export const avatarForm = avatarPopup.querySelector('.popup_form');

