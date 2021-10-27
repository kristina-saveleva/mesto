const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__image');

const openPopup = function() {
    popupElement.classList.add('popup_opened');
};

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

let nameProf = document.querySelector('.profile__text');
let jobProf = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__forms');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__explane');
let popupSave = document.querySelector('.popup__form');

function formSubmitHandler (event) {
    event.preventDefault(); 
    jobProf.textContent = jobInput.value;
    nameProf.textContent = nameInput.value;
    closePopup();
}

popupSave.addEventListener('submit', formSubmitHandler);