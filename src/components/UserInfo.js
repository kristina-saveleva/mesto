export class UserInfo {
    constructor({elementName, elementInfo}) {
        this._elementName = document.querySelector(elementName);
        this._elementInfo = document.querySelector(elementInfo);
    }

    getUserInfo() {
        return {
            elementName: this._elementName.textContent,
            elementInfo: this._elementInfo.textContent,
        }
    }

    setUserInfo(data) {
       this._elementName.textContent = data.elementName;
       this._elementInfo.textContent = data.elementInfo;
    }
}