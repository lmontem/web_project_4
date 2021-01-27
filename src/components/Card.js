class Card {
    constructor({
        data,
        handleCardImageClick,
        handleDeleteClick
    },
        template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardImageClick = handleCardImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data._id;

    }

    id() {
        return this._id;
    }

    deleteCard (){
               this._cardElem.remove('.card');       
      
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._template).content.querySelector('.card');
        return cardTemplate;
    }

    _setEventListeners() {
        const likeBtn = this._cardElem.querySelector('.card__like-btn');
        const deleteBtn = this._cardElem.querySelector('.card__delete-btn');
        
        

        //like button event
        likeBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('card__like-btn_active');
        })
        //delete button event
        deleteBtn.addEventListener('click', (e) => {
            this._handleDeleteClick(this.id());
            //e.target.closest('.card').remove();
        })

        //open image popup
        this._image.addEventListener('click', () => {
            this._handleCardImageClick(this._name, this._link);
        })
    }
    generateCard() {


        this._cardElem = this._getCardTemplate().cloneNode(true);
        const title = this._cardElem.querySelector('.card__heading');
        this._image = this._cardElem.querySelector('.card__image');


        title.textContent = this._name;
        this._image.style.backgroundImage = `url(${this._link})`;

        this._setEventListeners();
        return this._cardElem;

    }
}

export default Card;