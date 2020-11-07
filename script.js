
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = popup.querySelector('.popup__close-btn');
let form = popup.querySelector('.popup__form');
let name = popup.querySelector('.popup__name');
let aboutMe = popup.querySelector('.popup__aboutme');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

editButton.addEventListener('click', function(){    
    popup.classList.add('popup_opened');

})

closeButton.addEventListener('click', function(){
    popup.classList.remove('popup_opened');
})

form.addEventListener('submit', function(event){
    event.preventDefault();   

    profileName.textContent = name.value;
    profileOccupation.textContent = aboutMe.value;

    popup.classList.remove('popup_opened');

   
})