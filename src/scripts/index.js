import { initialCards, settings } from "./array.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import '../pages/index.css'; // add import of the main stylesheets file

const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');
//buttons
const editButton = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');
//edit form
const editForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const aboutMeInput = editProfilePopup.querySelector('.popup__input_type_about');
//add form
const addCardForm = addCardPopup.querySelector('.popup__form');


const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addCardForm);
cardFormValidator.enableValidation();


const imagePopup = new PopupWithImage('.popup__type_image');



const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item, handleCardImageClick: (name, link) => {
                imagePopup.open(name, link);
                imagePopup.setEventListeners();

            }
        }, ".card-template")
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, ".cards");

defaultCardList.renderItems();


addCardBtn.addEventListener('click', () => {

    const popupAddCard = new PopupWithForm('.popup__type_add-card', (item) => {
        const card = new Card({
            data: item, handleCardImageClick: (name, link) => {
                imagePopup.open(name, link);

            }
        }, ".card-template")
        defaultCardList.addItem(card.generateCard());
        popupAddCard.close();
    })
    popupAddCard.setEventListeners();
    popupAddCard.open();
})

editButton.addEventListener('click', () => {
    const editPopup = new PopupWithForm('.popup__type_edit-profile', () => {

        userInfo.setUserInfo({ name: nameInput.value, about: aboutMeInput.value });
        editPopup.close();
    })

    const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__occupation' });



    nameInput.value = userInfo.getUserInfo().name;

    aboutMeInput.value = userInfo.getUserInfo().about;

    editPopup.setEventListeners();
    editPopup.open();

})