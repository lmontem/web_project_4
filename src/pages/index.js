import { settings, editButton, addCardForm, addCardBtn, editForm, nameInput, aboutMeInput, addCardPopup, deletePopup, editProfilePopup, avatarPopup, avatarEditBtn, avatarForm } from "../scripts/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import '../pages/index.css'; // add import of the main stylesheets file

let myId;

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
const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();

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
            handleIsLoading(false, deletePopup, "Yes");
            deleteConfirmPopup.setSubmitHandler(() => {
                handleIsLoading(true, deletePopup, "Deleting...");
                //remove the card
                api.removeCard(cardId)
                    .then(() => {
                        card.deleteCard();
                        deleteConfirmPopup.close();
                        handleIsLoading(false, deletePopup, "Yes");
                    })
                    .catch(err => console.log('Error! ' + err));
            })
        },
        handleLikes: (cardId) => {
            if (card.isLiked()) {
                api.changeLikeCardStatus(cardId, true)
                    .then((res) => {
                        card.getLikeCount(res.likes.length)
                    })
                    .then(() => {
                        card.dislikeCard()
                    })
                    .catch(err => console.log('Error! ' + err))

            } else {
                api.changeLikeCardStatus(cardId, false)
                    .then((res) => {
                        card.getLikeCount(res.likes.length);
                    })
                    .then(() => {
                        card.likeCard()
                    })
                    .catch(err => console.log('Error! ' + err))
            }
        },
        myId: myId,
    }, ".card-template")


    const cardElement = card.generateCard();
    return cardElement
}

const defaultCardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item, myId);
        defaultCardList.addItem(cardElement);
    }
}, ".cards")
handleIsLoading(false, addCardPopup, "Save");


//adding a card popup
const popupAddCard = new PopupWithForm('.popup__type_add-card', (data) => {
    handleIsLoading(true, addCardPopup, "Saving...");
    api.addCard(data)
        .then(res => {
            const card = createCard(res, myId);
            defaultCardList.addItem(card);
            popupAddCard.close();
        })
        .then(() => {
            handleIsLoading(false, addCardPopup, "Save");
        })
        .catch(err => console.log('Error! ' + err))
})

popupAddCard.setEventListeners();

addCardBtn.addEventListener('click', () => {
    cardFormValidator.resetValidation();
    popupAddCard.open();
})

//render initial cards with api
api.getAllInfo()
    .then(([userData, initialCardData]) => {
        myId = userData._id;
        userInfo.setUserInfo({ name: userData.name, about: userData.about });
        userInfo.changeAvatar(userData.avatar);
        defaultCardList.renderItems(initialCardData);
    })
    .catch(err => console.log('Error! ' + err))


const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__occupation', avatarSelector: '.profile__avatar' });
//update user info/send to api
handleIsLoading(false, editProfilePopup, "Save")
const editPopup = new PopupWithForm('.popup__type_edit-profile', (data) => {
    handleIsLoading(true, editProfilePopup, "Saving...");
    api.changeUserInfo({
        name: data.name,
        about: data.about,
    })
        .then((res) => {
            userInfo.setUserInfo({ name: res.name, about: res.about });
            editPopup.close();
            handleIsLoading(false, editProfilePopup, "Save")
        })
        .catch(err => console.log('Error! ' + err))
});

editPopup.setEventListeners();
editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo()
    nameInput.value = name;
    aboutMeInput.value = about;
    editFormValidator.resetValidation();
    editPopup.open();

})

handleIsLoading(false, avatarPopup, "Update");
//editing avatar popup
const avatarFormPopup = new PopupWithForm('.popup__type_avatar', (data) => {
    handleIsLoading(true, avatarPopup, "Updating...");

    api.setAvatar({
        avatar: data.link
    })
        .then((res) => {

            userInfo.changeAvatar(res.avatar);
            avatarFormPopup.close();
            handleIsLoading(false, avatarPopup, "Update");
        })
        .catch(err => console.log('Error! ' + err))

})

avatarFormPopup.setEventListeners();
avatarEditBtn.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    avatarFormPopup.open();
})


