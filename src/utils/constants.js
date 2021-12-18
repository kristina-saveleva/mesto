export const addProfileForm = document.querySelector('.popup-profileforms');
export const addNewCardForm = document.querySelector('.popup-cardforms');
export const editButton = document.querySelector('.profile__image');
export const inputName = document.querySelector('.popup__explane_name-pp');
export const inputProfession = document.querySelector('.popup__explane_job-pp');
export const profileAddButton = document.querySelector('.profile__button');
export const containerSelector = '.elements';
export const initialCards = [
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

export const config = {
  forms: '.popup__forms',
  inputSelector: '.popup__explane',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__explane_invalid',
};