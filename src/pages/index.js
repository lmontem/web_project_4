import { settings, editButton, addCardForm, addCardBtn, editForm, nameInput, aboutMeInput } from "../scripts/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import '../pages/index.css'; // add import of the main stylesheets file

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-8",
    headers: {
        authorization: "36dac5ff-0396-44c7-b439-6ad6e17c0bf0",
        "Content-Type": "application/json"
    }
});
//enables validation on forms
const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addCardForm);
cardFormValidator.enableValidation();

//sets image popup listener/instance
const imagePopup = new PopupWithImage('.popup__type_image');
imagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithForm('.popup__type_delete');

deleteConfirmPopup.setEventListeners();


//function to create a new card
function createCard(item) {
    const card = new Card({
        data: item, handleCardImageClick: (name, link) => {
            imagePopup.open(name, link);
        }, handleDeleteClick: (cardId) => {
            deleteConfirmPopup.open(cardId);
            deleteConfirmPopup.setSubmitHandler(() => {
                //remove the card
                api.removeCard(cardId)
                  .then(() => {
                    card.deleteCard();
                    deleteConfirmPopup.close();
                  })})

        },
    }, ".card-template")
    const cardElement = card.generateCard();
    return cardElement
}


//render initial cards with api
api.getInitialCards()
    .then(res => {
        const defaultCardList = new Section({
            items: res,
            renderer: (item) => {

                const cardElement = createCard(item);
                defaultCardList.addItem(cardElement);
            }
        }, ".cards");

        defaultCardList.renderItems();

        const popupAddCard = new PopupWithForm('.popup__type_add-card', (data) => {

            api.addCard(data)
                .then(res => {
                    const card = createCard(data);

                    defaultCardList.addItem(card);
                    popupAddCard.close();

                })//closing brackets for new popupw/form

        })//closing brackets for 2nd then 


        //eventlisteners need to be out of second then
        popupAddCard.setEventListeners();

        addCardBtn.addEventListener('click', () => {
            cardFormValidator.resetValidation();
            popupAddCard.open();
        })//closing for event listener

    })//first then closing brackets



//render initial profile info with api
api.getUserInfo()
    .then(res => {
        userInfo.setUserInfo({ name: res.name, about: res.about });
    })
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__occupation' });
//update user info/send to api
/*api.changeUserInfo({name,about})
.then(res =>{
    const editPopup = new PopupWithForm('.popup__type_edit-profile', () => {

        userInfo.setUserInfo({ name: nameInput.value, about: aboutMeInput.value });
        editPopup.close();
    })
    
    
    editPopup.setEventListeners();
    editButton.addEventListener('click', () => {
        const {name, about} = userInfo.getUserInfo()
        nameInput.value = name;
    
    aboutMeInput.value = about;
        editFormValidator.resetValidation();
        editPopup.open();
    
    })
    
}

)*/


/*
const popupAddCard = new PopupWithForm('.popup__type_add-card', (item) => {
  
   
   const card = createCard(item);
 
   defaultCardList.addItem(card);
   popupAddCard.close();

   })
   */
/*const card = createCard(item);
 
defaultCardList.addItem(card);
popupAddCard.close();
})
popupAddCard.setEventListeners();

addCardBtn.addEventListener('click', () => {
cardFormValidator.resetValidation();
  popupAddCard.open();
})*/

const editPopup = new PopupWithForm('.popup__type_edit-profile', () => {

    userInfo.setUserInfo({ name: nameInput.value, about: aboutMeInput.value });
    editPopup.close();
})


editPopup.setEventListeners();
editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo()
    nameInput.value = name;

    aboutMeInput.value = about;
    editFormValidator.resetValidation();
    editPopup.open();

})