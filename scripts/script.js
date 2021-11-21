const profilePopupElement = document.querySelector('.popup-profile');
const popupcardElement = document.querySelector('.popup-card');
const popupCloseButtonElement = profilePopupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__image');
const popupOpenCardElement = document.querySelector('.profile__button')
const popupCloseCardElement = popupcardElement.querySelector('.popup__closecard');
const elementsTemplate = document.querySelector('#elements-template').content;
const cardsContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup-image');
const popupOpenImage = document.querySelector('.elements__rectangle');
const popupCloseImageElement = popupImage.querySelector('.popup__closeimage');
const nameProf = document.querySelector('.profile__text');
const jobProf = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__explane_name-pp');
const jobInput = document.querySelector('.popup__explane_job-pp');
const popupSave = document.querySelector('.popup__profileform');
const formCardElement = document.querySelector('.popup-cardforms');
const popupCardSave = document.querySelector('.popup__cardform');
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
const openPopup = function (open) {
  open.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Функция закрытия попапа общая
const closePopup = function (close) {
  close.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//Функция открытия попапа с занесением текущих данных из профиля в value
const openPopupProfile = function () {
  openPopup(profilePopupElement);
  nameInput.value = nameProf.textContent;
  jobInput.value = jobProf.textContent;
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

//функция закрытия попапа на src
function closePopupByEsc(event) {
  if(event.key === "Escape"){
    closePopup(profilePopupElement);
    closePopup(popupcardElement);
    closePopup(popupImage);
  }
};

//функция сохранения данных из попапа в профиль
function submitProfileForm(event) {
  event.preventDefault();
  jobProf.textContent = jobInput.value;
  nameProf.textContent = nameInput.value;
  closePopupProfile();
};

//Функция открытия попапа
const openPopupCard = function () {
  openPopup(popupcardElement);
}

//Функция закрытия попапа
const closePopupCard = function () {
  closePopup(popupcardElement);
};

//Функция создания карточек
function createCard(namePlaceValue, imagePlaceValue) {
  const cardsElement = elementsTemplate.querySelector('.elements__cards').cloneNode(true);
  cardsElement.querySelector('.elements__text').textContent = namePlaceValue;
  cardsElement.querySelector('.elements__rectangle').src = imagePlaceValue;
  cardsElement.querySelector('.elements__rectangle').alt = namePlaceValue;
  cardsElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  const deleteCards = cardsElement.querySelector('.elements__delete');
  deleteCards.addEventListener('click', function () {
    const cardsDelete = deleteCards.closest('.elements__cards');
    cardsDelete.remove();
  });

  const openImage = cardsElement.querySelector('.elements__rectangle');
  openImage.addEventListener('click', function () {
    popupImage.querySelector('.popup__photo').src = imagePlaceValue;
    popupImage.querySelector('.popup__figcaption').textContent = namePlaceValue;
    openPopup(popupImage);
  });

  return cardsElement;
}

//Функция добавления карточек
function addCard(card, container) {
  container.prepend(card);
}


// Функция сохранения измнений в попапе
function cardSubmitHandler(event) {
  event.preventDefault();
  const namePlace = document.querySelector('.popup__explane_names-pp');
  const imagePlace = document.querySelector('.popup__explane_photos-pp');

  addCard(createCard(namePlace.value, imagePlace.value), cardsContainer);

  namePlace.value = '';
  imagePlace.value = '';
  closePopupCard();
};

//Создание 6 карточек
initialCards.forEach(function (element) {
  addCard(createCard(element.name, element.link), cardsContainer);
});

//Функция закрытия попапа картинок
const closePopupImage = function () {
  closePopup(popupImage);
};

popupOpenButtonElement.addEventListener('click', openPopupProfile);
popupCloseButtonElement.addEventListener('click', closePopupProfile);
popupSave.addEventListener('submit', submitProfileForm);
popupOpenCardElement.addEventListener('click', openPopupCard);
popupCloseCardElement.addEventListener('click', closePopupCard);
popupCardSave.addEventListener('submit', cardSubmitHandler);
popupCloseImageElement.addEventListener('click', closePopupImage);
profilePopupElement.addEventListener('click', closePopupByclickOverlay);
popupcardElement.addEventListener('click', closePopupByclickOverlay);
popupImage.addEventListener('click', closePopupByclickOverlay);