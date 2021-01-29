import { settings, editButton, addCardForm, addCardBtn, editForm, nameInput, aboutMeInput, addCardPopup, deletePopup, editProfilePopup, avatarPopup, avatarEditBtn, avatarForm} from "../scripts/constants.js";
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
//const avatarFormValidator = new FormValidator(settings, avatarForm);
//avatarFormValidator.enableValidation();

//sets image popup listener/instance
const imagePopup = new PopupWithImage('.popup__type_image');
imagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithForm('.popup__type_delete');

deleteConfirmPopup.setEventListeners();
//loading function
function handleIsLoading(isLoading, popup, text) {
    if (isLoading) {
        popup.querySelector('.popup__save-btn').textContent = text;
    } else {
        popup.querySelector('.popup__save-btn').textContent = text;
    }
}

//function to create a new card
function createCard(item, myId) {
    const card = new Card({
        data: item, handleCardImageClick: (name, link) => {
            imagePopup.open(name, link);
        }, handleDeleteClick: (cardId) => {
            deleteConfirmPopup.open(cardId);
            deleteConfirmPopup.setSubmitHandler(() => {
                handleIsLoading(true, deletePopup, "Deleting...");
                //remove the card
                api.removeCard(cardId)
                    .then(() => {

                        card.deleteCard();
                        deleteConfirmPopup.close();
                        handleIsLoading(false, deletePopup, "Yes");
                    })

            })
        },
        myId: myId,
    }, ".card-template")
    //console.log("OwnerID: " + item.owner._id);
    //console.log(item);
    //console.log("My ID: " + myId);

    const cardElement = card.generateCard();
    return cardElement
}


//render initial cards with api
api.getAllInfo()
    .then(([userData, initialCardData]) => {
        const myId = userData._id;
        const defaultCardList = new Section({
            items: initialCardData,
            renderer: (item) => {
                const cardElement = createCard(item, myId);
                defaultCardList.addItem(cardElement);
            }
        }, ".cards")
        //render initial profile info with api
        //api.getUserInfo()
            //.then(res => {

        userInfo.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar });
            //})
    //})
      defaultCardList.renderItems();

        const popupAddCard = new PopupWithForm('.popup__type_add-card', (data) => {
            handleIsLoading(true, addCardPopup, "Saving...");
            api.addCard(data)
                .then(res => {
                    const card = createCard(res, myId);
                   
                    defaultCardList.addItem(card);
                    popupAddCard.close();
                    

                })

        })
        handleIsLoading(false, addCardPopup, "Save");

        //eventlisteners need to be out of second then
        popupAddCard.setEventListeners();

        addCardBtn.addEventListener('click', () => {
           
            cardFormValidator.resetValidation();
            popupAddCard.open();
        })//closing for event listener

    })





const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__occupation', avatarSelector: '.profile__avatar' });
//update user info/send to api

const editPopup = new PopupWithForm('.popup__type_edit-profile', (data) => {
    handleIsLoading(true, editProfilePopup, "Saving...");
    api.changeUserInfo({
        name: data.name,
        about: data.about,
        

    })

        .then((res) => {
            userInfo.setUserInfo({ name: res.name, about: res.about });
            editPopup.close();
            handleIsLoading(false, editProfilePopup, "Save");
        })

});

editPopup.setEventListeners();
editButton.addEventListener('click', () => {
    const { name, about} = userInfo.getUserInfo()
    
    nameInput.value = name;

    aboutMeInput.value = about;
    editFormValidator.resetValidation();
    editPopup.open();

})

const avatarFormPopup = new PopupWithForm('.popup__type_avatar',(data)=>{
    handleIsLoading(true, avatarPopup, "Update");
    console.log ("Popup Data: " + data.link);
    api.setAvatar({
        avatar: data.link
    })
    .then((res)=>{console.log(res);
        console.log("Popup res " + res.avatar);
        userInfo.changeAvatar(res.avatar)
    })
    avatarFormPopup.close();
})
avatarFormPopup.setEventListeners();
avatarEditBtn.addEventListener('click', ()=>{
    //avatarFormValidator.resetValidation();
    avatarFormPopup.open();
})

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

/*const editPopup = new PopupWithForm('.popup__type_edit-profile', () => {

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

})*/