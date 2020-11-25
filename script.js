//popups
let imagePopup = document.querySelector('.popup__type_image');
let editProfilePopup = document.querySelector('.popup__type_edit-profile');
let addCardPopup = document.querySelector('.popup__type_add-card');
//template
let cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
//buttons
let editButton = document.querySelector('.profile__edit-btn');
let editCloseBtn = editProfilePopup.querySelector('.popup__close-btn');
let addCardBtn = document.querySelector('.profile__add-btn');
let closeAddBtn = addCardPopup.querySelector('.popup__close-btn');
let imageClosebtn = imagePopup.querySelector('.popup__close-btn');

//edit form
let editForm = editProfilePopup.querySelector('.popup__form');
let name = editProfilePopup.querySelector('.popup__input_type_name');
let aboutMe = editProfilePopup.querySelector('.popup__input_type_about');
//add form
let addCardForm = addCardPopup.querySelector('.popup__form');
let cardTitle = addCardPopup.querySelector('.popup__input_type_title');
let cardLink = addCardPopup.querySelector('.popup__input_type_image-link');
//other DOM
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let cards = document.querySelector('.cards');

let title = cardTemplate.querySelector('.card__heading');
let image = cardTemplate.querySelector('.card__image');

let initialCards = [{
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
//popup open/close function
function formOpenClose(popup) {
    popup.classList.toggle('popup_opened');

}

//add new card
function addCard(newCard) {
    let cardElem = cardTemplate.cloneNode(true);
    let title = cardElem.querySelector('.card__heading');
    let image = cardElem.querySelector('.card__image');

    let likeBtn = cardElem.querySelector('.card__like-btn');
    let deleteBtn = cardElem.querySelector('.card__delete-btn');

    title.textContent = newCard.name;
    image.style.backgroundImage = `url(${newCard.link})`;
    cards.prepend(cardElem);

    //like button event
    likeBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('card__like-btn_active');
    })

    //delete button event
    deleteBtn.addEventListener('click', () => {
        cardElem.remove(newCard);
    })

    //open image popup
    image.addEventListener('click', () => {
        let popupImage = imagePopup.querySelector('.popup__image');
        let popupImageTitle = imagePopup.querySelector('.popup__image-title');
        popupImage.src = newCard.link;
        popupImageTitle.textContent = newCard.name;
        formOpenClose(imagePopup);
    })


}

//adds initial cards
initialCards.forEach(card => addCard(card));

//image popup close button event
imageClosebtn.addEventListener('click', () => {
    formOpenClose(imagePopup);
});

//open and close add card popup
addCardBtn.addEventListener('click', () => {

    formOpenClose(addCardPopup);
})
closeAddBtn.addEventListener('click', () => {
    formOpenClose(addCardPopup);
})


//functonality of adding images/title
let addFormUpdate = e => {
    e.preventDefault();

    let cardElem = [];
    cardElem.name = cardTitle.value;
    cardElem.link = cardLink.value;
    addCard(cardElem);
    formOpenClose(addCardPopup);
}

addCardForm.addEventListener('submit', addFormUpdate)



//saves changes edit profile form
function editFormChange(event) {
    event.preventDefault();

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

    formOpenClose(editProfilePopup);
}
editForm.addEventListener('submit', editFormChange);
//opens profile edit popup
editButton.addEventListener('click', () => {
    if (!editProfilePopup.classList.contains('popup_opened')) {
        name.value = profileName.textContent;
        aboutMe.value = profileOccupation.textContent;
    }
    formOpenClose(editProfilePopup);
});
//closes profile edit popup
editCloseBtn.addEventListener('click', () => {
    formOpenClose(editProfilePopup);

});