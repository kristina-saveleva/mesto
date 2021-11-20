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

    form.addEventListener('input', handleFormInput);
    toggleButton(form);
}

function handleFormInput(evt) {
    toggleButton(evt.currentTarget);
}

function toggleButton(form) {
    const button = form.querySelector('.popup__save');
    const isFormInvalid = !form.checkValidity();

    button.disabled = isFormInvalid;
    button.classList.toggle('popup__button_invalid', isFormInvalid);
}

function addListenersToInput(input) {
    input.addEventListener('input', handleFieldValidation);
};

function handleFieldValidation(evt) {
    const element = evt.target;
    const errorContainer = document.querySelector(`#${element.id}-error`);
    element.setCustomValidity('');

    element.classList.toggle(
        'form__input_type_error',
        !element.validity.valid
    );

    validateLength(element);
    validateRequired(element);
    validateURL(element);
    
    errorContainer.textContent = element.validationMessage;
}

function validateLength(element) {
    if (element.validity.tooShort || element.validity.tooLong) {
        element.setCustomValidity('укажите длину от 2 до 150 символов');
    }
};

function validateRequired(element) {
    if (element.validity.valueMissing) {
        element.setCustomValidity('Поле обязательно');
    }
};

function validateURL(element) {
    if (element.validity.typeMismatch && element.type === 'url') {
        element.setCustomValidity('Здесь должен быть url');
    }
}