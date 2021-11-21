enableValidation({
    forms: '.popup__forms',
    inputSelector: 'popup__explane',
    submitButtonSelector: '..popup__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

function enableValidation(configObj) {
    const forms = document.querySelectorAll(configObj.forms);

    forms.forEach(function (item, index){addListenersToForm(item, configObj)});
}

function addListenersToForm(form, configObj) {
    const inputs = Array.from(form.querySelectorAll(configObj.inputSelector));

    inputs.forEach(addListenersToInput)

    form.addEventListener('submit', handleFormSubmit);

    form.addEventListener('input', handleFormInput);
    toggleButton(form);
}


function handleFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const inputs = Array.from(form.querySelectorAll('.popup__explane'));

    const data = inputs.reduce((acc, input) => {
        const key = input.name;
        const value = input.value;
        acc[key] = value;
        return acc;
    }, {});
}

function handleFormInput(evt) {
    toggleButton(evt.currentTarget);
}

function toggleButton(form) {
    const button = form.querySelector(config.submitButtonSelector);
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
        element.setCustomValidity('');
    }
};

function validateRequired(element) {
    if (element.validity.valueMissing) {
        element.setCustomValidity('');
    }
};

function validateURL(element) {
    if (element.validity.typeMismatch && element.type === 'url') {
        element.setCustomValidity('');
    }
}