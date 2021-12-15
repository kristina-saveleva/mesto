export class FormValidator {
    constructor(obj, formElement) {
        this._formElement = formElement;
        this._obj = obj;
        this._button = this._formElement.querySelector(this._obj.submitButtonSelector);
        this._inputs = [...this._formElement.querySelectorAll(this._obj.inputSelector)];
    }

    enableValidation() {
        this._addListenersToForm();
    }

    _addListenersToForm() {
        // добавляет для каждого инпута слушатель
        this._addListenersToInputs(this._inputs);
        //устанавливает состояние кнопки
        this.setSubmitButtonState();
    }

    _addListenersToInputs(inputs) {
        inputs.forEach(input => {
            input.addEventListener('input', (event) => {
                this._handleFieldValidation(event);
            });
        });
    }

    setSubmitButtonState() {
        this._button.disabled = !this._formElement.checkValidity();
        this._button.classList.toggle(this._obj.inactiveButtonClass, !this._formElement.checkValidity());
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
        this.setSubmitButtonState();
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