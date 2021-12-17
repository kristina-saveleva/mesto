import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imgContainer = document.querySelector('.popup__photo');
        this._textContainer = document.querySelector('.popup__figcaption');
    }

    open(link, name) {
        this._imgContainer.src = link;
        this._imgContainer.alt = name;
        this._textContainer.textContent = name;
        super.open();
    }
}