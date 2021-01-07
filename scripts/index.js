import { initialCards, settings } from "./array.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


//popups
const imagePopup = document.querySelector('.popup__type_image');
const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');

//image popup elements
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-title');
//buttons
const editButton = document.querySelector('.profile__edit-btn');
const editCloseBtn = editProfilePopup.querySelector('.popup__close-btn');
const addCardBtn = document.querySelector('.profile__add-btn');
const closeAddBtn = addCardPopup.querySelector('.popup__close-btn');
const imageClosebtn = imagePopup.querySelector('.popup__close-btn');

//edit form
const editForm = editProfilePopup.querySelector('.popup__form');
const name = editProfilePopup.querySelector('.popup__input_type_name');
const aboutMe = editProfilePopup.querySelector('.popup__input_type_about');
//add form
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardTitle = addCardPopup.querySelector('.popup__input_type_title');
const cardLink = addCardPopup.querySelector('.popup__input_type_image-link');
//other DOM
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const cards = document.querySelector('.cards');

const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addCardForm);
cardFormValidator.enableValidation();






//render cards
function renderCards(data, wrap) {
    const card = new Card(data, ".card-template");
    wrap.prepend(card.generateCard());
}

//adds initial cards
initialCards.forEach(data => {
    renderCards(data, cards);

})


//image popup close button event
imageClosebtn.addEventListener('click', () => {
    closePopup(imagePopup);
});

//open and close add card popup
addCardBtn.addEventListener('click', () => {
    addCardForm.reset();
    openPopup(addCardPopup);
})
closeAddBtn.addEventListener('click', () => {
    closePopup(addCardPopup);
})


//functonality of adding images/title
const addFormUpdate = e => {
    e.preventDefault();

    const cardElem = {};
    cardElem.name = cardTitle.value;
    cardElem.link = cardLink.value;
    renderCards(cardElem, cards);
    closePopup(addCardPopup);
}

addCardForm.addEventListener('submit', addFormUpdate)



//saves changes edit profile form
function editFormChange(event) {
    event.preventDefault();

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

    closePopup(editProfilePopup);
}
editForm.addEventListener('submit', editFormChange);

//opens profile edit popup
editButton.addEventListener('click', () => {
    name.value = profileName.textContent;
    aboutMe.value = profileOccupation.textContent;
    openPopup(editProfilePopup);
});

//closes profile edit popup w/ button
editCloseBtn.addEventListener('click', () => {
    closePopup(editProfilePopup);

});

export function handleCardImageClick(name, link) {
    popupImage.alt = name;
    popupImage.src = link;
    popupImageTitle.textContent = name;
    openPopup(imagePopup);
}