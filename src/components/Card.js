class Card {
    constructor({
        data,
        handleCardImageClick,
        handleDeleteClick,
        handleLikes,
        myId
    },
        template) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._id = data._id;
        this._likes = data.likes;
        this._template = template;
        this._cardElem = this._getCardTemplate();
        this._handleCardImageClick = handleCardImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikes = handleLikes;
        this._cardLikes = this._cardElem.querySelector('.card__like-count');
        this._myId = myId;
        this._likeBtn = this._cardElem.querySelector('.card__like-btn');
        this._deleteBtn = this._cardElem.querySelector('.card__delete-btn');
        this._image = this._cardElem.querySelector('.card__image');
        this._title = this._cardElem.querySelector('.card__heading');
    }

    id() {
        return this._id;
    }

    deleteCard() {
        this._cardElem.remove('.card');

    }

    isLiked() {
        if (this._likeBtn.classList.contains('card__like-btn_active')) {
            return true;
        }
        else {
            return false;
        }
    }

    likeCard() {
        this._likeBtn.classList.add('card__like-btn_active')
    }

    dislikeCard() {
        this._likeBtn.classList.remove('card__like-btn_active')
    }

    _removeTrashBtn() {
        if (this._owner._id !== this._myId) {
            this._deleteBtn.style.display = "none";
        }
    }

    getLikeCount(count) {
        this._cardLikes.textContent = count;
    }

    showLikes() {
        if (this._likes.some(like => like._id === this._myId)) {
            this._likeBtn.classList.add('card__like-btn_active');
        }
    }
    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._template).content.querySelector('.card')
            .cloneNode(true);
        return cardTemplate;
    }

    _setEventListeners() {

        //like button event
        this._likeBtn.addEventListener('click', () => {
            this._handleLikes(this.id());
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

        this._title.textContent = this._name;
        this._image.style.backgroundImage = `url(${this._link})`;
        this._removeTrashBtn();
        this.getLikeCount(this._likes.length);
        this.showLikes();
        this._setEventListeners();
        return this._cardElem;

    }
}

export default Card;