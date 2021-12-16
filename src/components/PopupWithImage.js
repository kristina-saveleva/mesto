import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imgContainer = document.querySelector('.elements__rectangle');
        this._textContainer = document.querySelector('.elements__text');
    }

    open(link, name) {
        this._imgContainer.src = link;
        this._imgContainer.alt = link;
        this._textContainer.textContent = name;
    }
}