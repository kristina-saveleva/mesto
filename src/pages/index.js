import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const addProfileForm = document.querySelector('.popup-profileforms');
const addNewCardForm = document.querySelector('.popup-cardforms');
const buttonSave = document.querySelector('.popup__save');
const editButton = document.querySelector('.profile__image');
const inputName = document.forms.add.name;
const inputProfession = document.forms.add.job;

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
const popupWithImage = new PopupWithImage('.popup-image');
const userInfo = new UserInfo({
  elementName: '.popup__explane_name-pp',
  elementInfo: '.popup__explane_job-pp',
});
const popupWithFormCard = new PopupWithForm('.popup-card', {
  submitForms: (formValues) => {
    const card = createCard(formValues);
    cardsList.addItem(card);
  }
});
const popupWithFormProfile = new PopupWithForm('.popup-profile', {
  submitForms: (formValues) => {
    userInfo.setUserInfo(formValues);
  }
});
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardsList.addItem(card);
  }
}, containerSelector);


function createCard(item) {
  const card = new Card(item, '#elements-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(link, name);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

formValidatorProfile.enableValidation();
formValidatorPlaceAdd.enableValidation();
cardsList.renderItems();
popupWithImage.setEventListeners();
popupWithFormCard.setEventListeners();
buttonSave.addEventListener('click', () => {
  popupWithFormCard.open();
});
popupWithFormProfile.setEventListeners();
editButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  inputName.value = userInfoData.name;
  inputProfession.value = userInfoData.profession;
  popupWithFormProfile.open();
});