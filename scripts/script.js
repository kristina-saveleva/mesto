const popupElement = document.querySelector('.popup');
const popupcardElement = document.querySelector('.popup-card');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__image');
const popupOpenCardElement = document.querySelector('.profile__button')
const popupCloseCardElement = popupcardElement.querySelector('.popup__closecard');
const elementsTemplate = document.querySelector('#elements-template').content;
const cardsContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup-image');
const popupOpenImage = document.querySelector('.elements__rectangle');
const popupCloseImageElement = popupImage.querySelector('.popup__closeimage');
let saveButton = document.querySelector('.popup__savecard');
let nameProf = document.querySelector('.profile__text');
let jobProf = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__forms');
let nameInput = formElement.querySelector('.popup__explane_name_pp');
let jobInput = formElement.querySelector('.popup__explane_job_pp');
let popupSave = document.querySelector('.popup__form');
let formCardElement = document.querySelector('.popup-cardforms');
let nameInputPlace = formCardElement.querySelector('.popup__forms_name-pp');
let photoInputPlace = formCardElement.querySelector('.popup__forms_photo-pp');
let popupCardSave = document.querySelector('.popup__cardform');
let deleteCardsElement = document.querySelector('.elements__delete');
let imageCard = document.querySelector('.popup__photo');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
    }
  ];

//Функция открытия попапа общая
const mainOpenPopup =  function(open) {
   open.classList.add('popup_opened');
}

//Функция закрытия попапа общая
const mainClosePopup = function(close) {
    close.classList.remove('popup_opened');
}

//Функция открытия попапа с занесением текущих данных из профиля в value
const openPopup = function() {
    mainOpenPopup(popupElement);
    nameInput.value = nameProf.textContent;
    jobInput.value = jobProf.textContent;
};

//Функция закрытия попапа
const closePopup = function() {
    mainClosePopup(popupElement);
};

//функция сохранения данных из попапа в профиль
function formSubmitHandler (event) {
    event.preventDefault(); 
    jobProf.textContent = jobInput.value;
    nameProf.textContent = nameInput.value;
    closePopup();
};

//Функция открытия попапа
const openPopupCard = function() {
    mainOpenPopup(popupcardElement);
}

//Функция закрытия попапа
const closePopupCard = function() {
    mainClosePopup(popupcardElement);
};

//Функция добавления карточек
function addCards (namePlaceValue, imagePlaceValue) {
    let cardsElement = elementsTemplate.querySelector('.elements__cards').cloneNode(true);
    cardsElement.querySelector('.elements__text').textContent = namePlaceValue;
    cardsElement.querySelector('.elements__rectangle').src = imagePlaceValue;
    cardsElement.querySelector('.elements__rectangle').alt = namePlaceValue;
    cardsElement.querySelector('.elements__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('elements__like_active');
        });
    cardsContainer.prepend(cardsElement);
    
    const deleteCards = document.querySelector('.elements__delete');
    deleteCards.addEventListener('click', function() {
        const cardsDelete = deleteCards.closest('.elements__cards');
        cardsDelete.remove();
    });

    const openImage = document.querySelector('.elements__rectangle');
    openImage.addEventListener('click', function() {
      popupImage.querySelector('.popup__photo').src = imagePlaceValue;
      popupImage.querySelector('.popup__figcaption').textContent = namePlaceValue;
      mainOpenPopup(popupImage);
    });
    }

// Функция сохранения измнений в попапе
function cardSubmitHandler (event) {
    event.preventDefault();
    const namePlace = document.querySelector('.popup__forms_name-pp');
    const imagePlace = document.querySelector('.popup__forms_photo-pp');

    addCards(namePlace.value, imagePlace.value)

    namePlace.value = '';
    imagePlace.value = '';
    closePopupCard();
};

//Функция открытия 6 карточек
  initialCards.forEach(function(element) {
    addCards(element.name, element.link);
});

//Функция закрытия попапа картинок
const closePopupImage = function() {
    mainClosePopup(popupImage);
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSave.addEventListener('submit', formSubmitHandler);
popupOpenCardElement.addEventListener('click', openPopupCard);
popupCloseCardElement.addEventListener('click', closePopupCard);
popupCardSave.addEventListener('submit', cardSubmitHandler);
popupCloseImageElement.addEventListener('click', closePopupImage);