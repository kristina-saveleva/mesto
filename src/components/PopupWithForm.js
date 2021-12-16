import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForms}) {
        super(popupSelector)
        this._submitForms = submitForms;
        this._popupForms = this._popup.querySelector('.popup__forms');
    }

    _getInputValues() {
        this._inputs = this._popupForms.querySelectorAll('.popup__explane');
        this._formValues = {};
        this._inputs.forEach(element => {
            this._formValues[element.name] = element.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._popupForms.reset();
    }

    setEventListeners(card) {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForms(this._getInputValues());
            this.close();
        });   
    }
}