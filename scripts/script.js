//popups
const imagePopup = document.querySelector('.popup__type_image');
const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');
//template
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
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

//image popup elements
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-title');

//popup open/close function
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');

}

//add new card function
function addCard(newCard) {
    const cardElem = cardTemplate.cloneNode(true);
    const title = cardElem.querySelector('.card__heading');
    const image = cardElem.querySelector('.card__image');

    const deleteBtn = cardElem.querySelector('.card__delete-btn');

    title.textContent = newCard.name;
    image.style.backgroundImage = `url(${newCard.link})`;

    //delete button event
    deleteBtn.addEventListener('click', () => {
        cardElem.remove(newCard);
    })

    //open image popup
    image.addEventListener('click', () => {
        popupImage.alt = newCard.name
        popupImage.src = newCard.link;
        popupImageTitle.textContent = newCard.name;
        togglePopup(imagePopup);
    })

    return cardElem;

}

//adds initial cards
initialCards.forEach(card => {
    cards.prepend(addCard(card));

})


//like button event
cards.addEventListener('click', e => {
    if (e.target.classList.contains('card__like-btn')) {
        e.target.classList.toggle('card__like-btn_active');

    }
});

//image popup close button event
imageClosebtn.addEventListener('click', () => {
    togglePopup(imagePopup);
});

//open and close add card popup
addCardBtn.addEventListener('click', () => {

    togglePopup(addCardPopup);
})
closeAddBtn.addEventListener('click', () => {
    togglePopup(addCardPopup);
})


//functonality of adding images/title
const addFormUpdate = e => {
    e.preventDefault();

    const cardElem = {};
    cardElem.name = cardTitle.value;
    cardElem.link = cardLink.value;
    cards.prepend(addCard(cardElem));
    togglePopup(addCardPopup);
}

addCardForm.addEventListener('submit', addFormUpdate)



//saves changes edit profile form
function editFormChange(event) {
    event.preventDefault();

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

    togglePopup(editProfilePopup);
}
editForm.addEventListener('submit', editFormChange);
//opens profile edit popup
editButton.addEventListener('click', () => {
    if (!editProfilePopup.classList.contains('popup_opened')) {
        name.value = profileName.textContent;
        aboutMe.value = profileOccupation.textContent;
    }
    togglePopup(editProfilePopup);
});
//closes profile edit popup
editCloseBtn.addEventListener('click', () => {
    togglePopup(editProfilePopup);

});