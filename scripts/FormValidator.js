export class FormValidator {
    constructor(obj, formElement) {
        this._formElement = formElement;
        this._obj = obj;
    }

    enableValidation() {
        this._addListenersToForm();
    }

    _addListenersToForm() {
        //ищет все инпуты в форме
        const inputs = [...this._formElement.querySelectorAll(this._obj.inputSelector)];
        // добавляет для каждого инпута слушатель
        this._addListenersToInputs(inputs);
        //добавляет слушатель форме при событии сабмит
        this._formElement.addEventListener('submit', (event) => {
            this._handleSubmit(event, inputs);
        });
        //добавляет слушатель форме при событии инпут
        this._formElement.addEventListener('input', (event) => {
            this._handleFormInput(event);
        });
        //устанавливает состояние кнопки
        this._setSubmitButtonState();
    }

    _addListenersToInputs(inputs) {
        inputs.forEach(input => {
            input.addEventListener('input', (event) => {
                this._handleFieldValidation(event);
            });
        });
    }

    _handleSubmit(event, inputs) {
        event.preventDefault();
        //находим кнопку сохранения
        const button = document.querySelector('.popup__save');
        button.disabled = true;
        button.classList.add('popup__save_invalid');
    }

    _handleFormInput() {
        this._setSubmitButtonState();
    }

    _setSubmitButtonState() {
        const button = this._formElement.querySelector(this._obj.submitButtonSelector);
        button.disabled = !this._formElement.checkValidity();
        button.classList.toggle(this._obj.inactiveButtonClass, !this._formElement.checkValidity());
    }

    _handleFieldValidation(event) {
        const { target: element } = event;
        //сбрасывает текст ошибки
        element.setCustomValidity('');
        //верстка элемента ошибки
        const errorContainer = document.querySelector(`#${element.id}-error`);
        //вызывает функции проверки
        this._validateLength(element);
        this._validateValueMissing(element);
        //устанавливает сообщение об ошибке
        errorContainer.textContent = element.validationMessage;
        //добавляет или убирает класс с ошибкой в зависимости от условия
        element.classList.toggle(this._obj.inputErrorClass, !element.validity.valid);
    }

    _validateLength(element) {
        if (element.validity.tooShort || element.validity.tooLong) {
            element.setCustomValidity(`Введите от ${element.minLength} до ${element.maxLength} символов`);
        }
    }

    _validateValueMissing(element) {
        if (element.validity.valueMissing) {
            element.setCustomValidity('Заполните поле');
        }
    }
}
