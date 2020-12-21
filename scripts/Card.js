import {
    openPopup,
    imagePopup
} from './index.js';



class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._template).content.querySelector('.card');
        return cardTemplate;
    }

    _setEventListeners() {
        const likeBtn = this._cardElem.querySelector('.card__like-btn');
        const deleteBtn = this._cardElem.querySelector('.card__delete-btn');
        const image = this._cardElem.querySelector('.card__image');
        //image popup elements
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupImageTitle = imagePopup.querySelector('.popup__image-title');
        //like button event
        likeBtn.addEventListener('click', (e) => {
                e.target.classList.toggle('card__like-btn_active');
            })
            //delete button event
        deleteBtn.addEventListener('click', (e) => {
            e.target.closest('.card').remove();
        })

        //open image popup
        image.addEventListener('click', () => {
            popupImage.alt = this._name
            popupImage.src = this._link;
            popupImageTitle.textContent = this._name;
            openPopup(imagePopup);
        })
    }
    generateCard() {


        this._cardElem = this._getCardTemplate().cloneNode(true);
        const title = this._cardElem.querySelector('.card__heading');
        const image = this._cardElem.querySelector('.card__image');


        title.textContent = this._name;
        image.style.backgroundImage = `url(${this._link})`;

        this._setEventListeners();
        return this._cardElem;

    }
}

export default Card;