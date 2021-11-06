const popupElement = document.querySelector('.popup');
const popupcardElement = document.querySelector('.popup__card');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__image');
const popupOpenCardElement = document.querySelector('.profile__button')
const popupCloseCardElement = popupcardElement.querySelector('.popup__closecard');
const elementsTemplate = document.querySelector('#elements-template').content;
const cardsContainer = document.querySelector('.elements');
let saveButton = document.querySelector('.popup__savecard');
let nameProf = document.querySelector('.profile__text');
let jobProf = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__forms');
let nameInput = formElement.querySelector('.popup__explane_name_pp');
let jobInput = formElement.querySelector('.popup__explane_job_pp');
let popupSave = document.querySelector('.popup__form');
let formCardElement = document.querySelector('.card__forms');
let nameInputPlace = formCardElement.querySelector('.popup__place_name_pp');
let photoInputPlace = formCardElement.querySelector('.popup__place_photo_pp');
let popupCardSave = document.querySelector('.popup__cardform');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//Функция открытия попапа с занесением текущих данных из профиля в value
const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = nameProf.textContent;
    jobInput.value = jobProf.textContent;
};

//Функция закрытия попапа
const closePopup = function() {
    popupElement.classList.remove('popup_opened');
};

//функция сохранения данных из попапа в профиль
function formSubmitHandler (event) {
    event.preventDefault(); 
    jobProf.textContent = jobInput.value;
    nameProf.textContent = nameInput.value;
    closePopup();
};

//Функция открытия попапа карточек
const openPopupCard = function() {
    popupcardElement.classList.add('popup_opened');
};

//Функция закрытия попапа
const closePopupCard = function() {
    popupcardElement.classList.remove('popup_opened');
};

//Функция добавления карточек
function addCards (namePlaceValue, imagePlaceValue) {
    let cardsElement = elementsTemplate.querySelector('.elements__cards').cloneNode(true);
    cardsElement.querySelector('.elements__text').textContent = namePlaceValue;
    cardsElement.querySelector('.elements__rectangle').src = imagePlaceValue;
    cardsElement.querySelector('.elements__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('elements__like_active');
        });
    cardsContainer.prepend(cardsElement);
}

// Функция сохранения измнений в попапе
function cardSubmitHandler (event) {
    event.preventDefault();
    const namePlace = document.querySelector('.popup__place_name_pp');
    const imagePlace = document.querySelector('.popup__place_photo_pp');

    addCards(namePlace.value, imagePlace.value)

    namePlace.value = '';
    imagePlace.value = '';
    closePopupCard();
};

//Функция открытия 6 карточек
initialCards.forEach(function(element) {
    addCards(element.name, element.link);
});



popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSave.addEventListener('submit', formSubmitHandler);
popupOpenCardElement.addEventListener('click', openPopupCard);
popupCloseCardElement.addEventListener('click', closePopupCard);
popupCardSave.addEventListener('submit', cardSubmitHandler);
