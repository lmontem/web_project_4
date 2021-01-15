import { initialCards, settings, editButton, addCardForm, addCardBtn, editForm, nameInput, aboutMeInput } from "../scripts/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css'; // add import of the main stylesheets file



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

addCardBtn.addEventListener('click', () => {
      popupAddCard.open();
})

const editPopup = new PopupWithForm('.popup__type_edit-profile', () => {

    userInfo.setUserInfo({ name: nameInput.value, about: aboutMeInput.value });
    editPopup.close();
})

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__occupation' });



editPopup.setEventListeners();
editButton.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;

aboutMeInput.value = userInfo.getUserInfo().about;
    
    editPopup.open();

})