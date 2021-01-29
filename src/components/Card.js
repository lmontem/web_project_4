class Card {
    constructor({
        data,
        handleCardImageClick,
        handleDeleteClick,
        myId
    }, 
        template) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._id = data._id;
        this._template = template;
        this._cardElem = this._getCardTemplate();
        this._handleCardImageClick = handleCardImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._myId = myId;

        this._deleteBtn = this._cardElem.querySelector('.card__delete-btn');
        this._image = this._cardElem.querySelector('.card__image');
    }

    id() {
        return this._id;
    }

    deleteCard() {
        this._cardElem.remove('.card');

    }

    _removeTrashBtn() {
        if (this._owner._id !== this._myId) {
            this._deleteBtn.style.display = "none";
        }
    }
    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._template).content.querySelector('.card')
            .cloneNode(true);
        return cardTemplate;
    }

    _setEventListeners() {
        const likeBtn = this._cardElem.querySelector('.card__like-btn');


        //like button event
        likeBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('card__like-btn_active');
        })
        //delete button event
        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteClick(this.id());

        })

        //open image popup
        this._image.addEventListener('click', () => {
            this._handleCardImageClick(this._name, this._link);
        })
    }
    generateCard() {

        const title = this._cardElem.querySelector('.card__heading');


        title.textContent = this._name;
        this._image.style.backgroundImage = `url(${this._link})`;
        this._removeTrashBtn();
        this._setEventListeners();
        return this._cardElem;

    }
}

export default Card;