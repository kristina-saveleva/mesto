import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import './pages/index.css';

const addProfileForm = document.querySelector('.popup-profileforms');
const addNewCardForm = document.querySelector('.popup-cardforms');
const profilePopupElement = document.querySelector('.popup-profile');
const popupСardElement = document.querySelector('.popup-card');
const popupCloseButtonElement = profilePopupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__image');
const popupOpenCardElement = document.querySelector('.profile__button')
const popupCloseCardElement = popupСardElement.querySelector('.popup__closecard');
const popupImage = document.querySelector('.popup-image');
const popupCloseImageElement = popupImage.querySelector('.popup__closeimage');
const nameProf = document.querySelector('.profile__text');
const jobProf = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__explane_name-pp');
const jobInput = document.querySelector('.popup__explane_job-pp');
const popupSaveProfile = document.querySelector('.popup__profileform');
const popupCardSave = document.querySelector('.popup__cardform');
const popupImageContainer = document.querySelector('.popup__photo');
const popupImageText = document.querySelector('.popup__figcaption');
const nameCard = document.querySelector('.popup__explane_names-pp');
const placeCard = document.querySelector('.popup__explane_photos-pp');
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

const config = {
  forms: '.popup__forms', 
  inputSelector: '.popup__explane', 
  submitButtonSelector: '.popup__save', 
  inactiveButtonClass: 'popup__save_invalid', 
  inputErrorClass: 'popup__explane_invalid', 
}; 

const formValidatorProfile = new FormValidator(config, addProfileForm);
const formValidatorPlaceAdd = new FormValidator(config, addNewCardForm);

function createCard(item) {
  const card = new Card(item, '#elements-template', openImage);
  const cardElement = card.generateCard();
  return cardElement;
}

//Новая функция
initialCards.forEach((item) => {
  const card = createCard(item);
  document.querySelector('.elements').append(card);
});

//функция закрытия попапа на Esc
function closePopupByEsc(event) {
  if(event.key === "Escape"){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//Функция закрытия попапа общая
const closePopup = function (close) {
  close.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//Функция открытия попапа общая
const openPopup = function (open) {
  open.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Функция открытия попапа с занесением текущих данных из профиля в value
const openPopupProfile = function () {
  openPopup(profilePopupElement);
  nameInput.value = nameProf.textContent;
  jobInput.value = jobProf.textContent;
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
};

//Функция открытия попапа карт
const openPopupCard = function () {
  openPopup(popupСardElement);
  formValidatorPlaceAdd.setSubmitButtonState();
}

function openImage(name, link) {
  popupImageContainer.src = link;
  popupImageContainer.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
}

//функция сохранения данных из попапа в профиль
function submitProfileForm(event) {
  event.preventDefault();
  jobProf.textContent = jobInput.value;
  nameProf.textContent = nameInput.value;
  closePopupProfile();
};

// Функция сохранения измнений в попапе 
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const placeName = nameCard.value;
  const imageLink = placeCard.value;
  const data = {
  name:placeName,
  link:imageLink,
  }
  const card = createCard(data);
  document.querySelector('.elements').prepend(card);
  closePopup(popupСardElement);
  nameCard.value = ""; 
  placeCard.value = ""; 
}; 

//Функция закрытия попапа
const closePopupProfile = function () {
  closePopup(profilePopupElement);
};

//Функция закрытия попапа кликом на оверлей
const closePopupByclickOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

//Функция закрытия попапа карт
const closePopupCard = function () {
  closePopup(popupСardElement);
};

//Функция закрытия попапа картинок
const closePopupImage = function () {
  closePopup(popupImage);
};

popupOpenButtonElement.addEventListener('click', openPopupProfile);
popupCloseButtonElement.addEventListener('click', closePopupProfile);
popupSaveProfile.addEventListener('submit', submitProfileForm);
popupOpenCardElement.addEventListener('click', openPopupCard);
popupCloseCardElement.addEventListener('click', closePopupCard);
popupCardSave.addEventListener('submit', cardSubmitHandler);
popupCloseImageElement.addEventListener('click', closePopupImage);
profilePopupElement.addEventListener('click', closePopupByclickOverlay);
popupСardElement.addEventListener('click', closePopupByclickOverlay);
popupImage.addEventListener('click', closePopupByclickOverlay);

formValidatorProfile.enableValidation();
formValidatorPlaceAdd.enableValidation();