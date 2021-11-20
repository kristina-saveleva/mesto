enableValidation();

function enableValidation() {
    const forms = document.querySelectorAll('.popup__forms');

    forms.forEach(addListenersToForm);
}

function addListenersToForm(form) {
    const inputs = Array.from(document.querySelectorAll('.popup__explane'));

    inputs.forEach(addListenersToInput)

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
}

function addListenersToInput(input) {
    input.addEventListener('input', handleFieldValidation);
};

function handleFieldValidation(evt) {
    const element = evt.target;
    const errorContainer = document.querySelector(`#${element.id}-error`);
    element.setCustomValidity('');

    element.classList.toggle('form__input_type_error', !element.validity.valid);
    errorContainer.textContent = element.validationMessage;

    if (element.validity.tooShort || element.validity.tooLong) {
        element.setCustomValidity('укажите длину от 2 до 150 символов');
    }
}