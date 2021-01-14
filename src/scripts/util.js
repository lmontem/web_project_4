export const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
},
{
    name: "Old Faithful",
    link: "https://images.unsplash.com/photo-1600269450099-58dd5976074a"
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
    name: "Niagra Falls",
    link: "https://images.unsplash.com/photo-1463695970743-ae65cca05743"
},
{
    name: "Grand Canyon",
    link: "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1"
},
{
    name: "Letchworth State Park",
    link: "https://images.unsplash.com/photo-1518719668060-f16ad0ce7602"
}
];

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
//buttons
export const editButton = document.querySelector('.profile__edit-btn');
export const addCardBtn = document.querySelector('.profile__add-btn');
//edit form
export const editForm = editProfilePopup.querySelector('.popup__form');
export const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
export const aboutMeInput = editProfilePopup.querySelector('.popup__input_type_about');
//add form
export const addCardForm = addCardPopup.querySelector('.popup__form');