import './index.css';
import { addProfileForm, addNewCardForm, buttonSave, editButton, inputName, inputProfession, containerSelector, initialCards, config } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
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
  inputName.value = userInfoData.elementName;
  inputProfession.value = userInfoData.elementInfo;
  popupWithFormProfile.open();
});