export class Card{
    constructor(data, cardSelector, {handleCardClick}){
      this._name = data.name;
      this._link = data.link;
      this._alt = data.alt;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
    
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__cards').cloneNode(true);
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      const cardData = this._element.querySelector('.elements__rectangle');
      cardData.src = this._link;
      cardData.alt = this._name;
      this._element.querySelector('.elements__text').textContent = this._name;
    
    return this._element;
    }

    _handleLikeClick() {
      this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }

    _handleDeleteClick() {
      this._element.querySelector('.elements__delete').closest('.elements__cards').remove();
    }

    _setEventListeners() {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('elements__delete')) {
                this._handleDeleteClick();
            } else if (evt.target.classList.contains('elements__like')) {
                this._handleLikeClick();
            } else {
                this._handleCardClick(this._name, this._link);
            }
        });
    }
  }