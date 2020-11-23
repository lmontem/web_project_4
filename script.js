
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
let likeBtn = document.querySelector('.card__like-btn');
let deleteBtn = document.querySelector('.card__delete-btn');
//edit form
let editForm = editProfilePopup.querySelector('.popup__form');
let name = editProfilePopup.querySelector('.popup__input_type_name');
let aboutMe = editProfilePopup.querySelector('.popup__input_type_about');
//add form
let addCardForm = addCardPopup.querySelector('.popup__form');
let cardTitle = addCardPopup.querySelector('.popup__input_type_card-title');
let cardLink = addCardPopup.querySelector('.popup__input_type_image-link');
//other DOM
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let cards = document.querySelector('.cards');

let title = cardTemplate.querySelector('.card__heading');
let image = cardTemplate.querySelector('.card__image');

let initialCards = [
    {
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
//adds intial cards 


initialCards.forEach((card)=>{
  let cardElem = cardTemplate.cloneNode(true);
  let title = cardElem.querySelector('.card__heading');
  let image = cardElem.querySelector('.card__image');
    
    title.textContent = card.name;
    image.style.backgroundImage = `url(${card.link})`;    
    cards.prepend(cardElem);
  //open image popup
    image.addEventListener('click', ()=>{
    let popupImage = imagePopup.querySelector('.popup__image');
    let popupImageTitle = imagePopup.querySelector('.popup__image-title');
    popupImage.src = card.link;
    popupImageTitle.textContent = card.name;
    formOpenClose(imagePopup);
  })
  })
    
  function formOpenClose(popup) {     
    popup.classList.toggle('popup_opened');    
}

//open and close add card popup
addCardBtn.addEventListener('click', ()=>{
  formOpenClose(addCardPopup);  
})
closeAddBtn.addEventListener('click', ()=>{
  formOpenClose(addCardPopup);
})

/*
//functonality of adding images/title
let addFormUpdate = e => {
  e.preventDefault();

  title.textContent = cardTitle.value; 
  image.url = cardLink.value;

  formOpenClose(addCardPopup);
}

addCardForm.addEventListener('submit',addFormUpdate)
*/


//saves changes edit profile form
function editFormChange(event){
    event.preventDefault();   

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

   formOpenClose(editProfilePopup);   
}
editForm.addEventListener('submit',editFormChange);
//opens profile edit popup
editButton.addEventListener('click', ()=>{
  if (!editProfilePopup.classList.contains('popup_opened')){
    name.value = profileName.textContent;
    aboutMe.value = profileOccupation.textContent;
}
formOpenClose(editProfilePopup);
});
//closes profile edit popup
editCloseBtn.addEventListener('click', ()=>{
  formOpenClose(editProfilePopup);
 
});



