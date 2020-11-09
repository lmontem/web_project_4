
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = popup.querySelector('.popup__close-btn');
let form = popup.querySelector('.popup__form');
let name = popup.querySelector('.popup__name');
let aboutMe = popup.querySelector('.popup__aboutme');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

function formOpenClose() {     
    name.value = profileName.textContent;
    aboutMe.value = profileOccupation.textContent;
    popup.classList.toggle('popup_opened');
    
}


function formChange(event){
    event.preventDefault();   

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

   formOpenClose();   
}

editButton.addEventListener('click', formOpenClose);

closeButton.addEventListener('click',formOpenClose);

form.addEventListener('submit',formChange);