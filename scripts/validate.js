const config = {
    forms: '.popup__forms', 
    inputSelector: '.popup__explane', 
    submitButtonSelector: '.popup__save', 
    inactiveButtonClass: 'popup__save_invalid', 
    inputErrorClass: 'popup__explane_invalid', 
}; 

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  function resetInputs(formElement){
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.value = '';
      hideInputError(formElement, inputElement);
    });
  }
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  function enableValidation() {
    const formList = Array.from(document.querySelectorAll(config.forms));;
    formList.forEach((formElement) => {  
      setEventListeners(formElement);
  });
  };

  enableValidation(); 

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };
  
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  };
  };