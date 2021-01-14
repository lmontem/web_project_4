class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._nameElem = document.querySelector(nameSelector);
        this._aboutElem = document.querySelector(aboutSelector);
    }
    getUserInfo() {
        const name = this._nameElem.textContent
        const about = this._aboutElem.textContent
        this._userInfoList = { name, about };
        return this._userInfoList;
    }

    setUserInfo(elements) {
        this._nameElem.textContent = elements.name;
        this._aboutElem.textContent = elements.about;

    }
}

export default UserInfo;