class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElem = document.querySelector(nameSelector);
        this._aboutElem = document.querySelector(aboutSelector);
        this._avatarElem = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        const name = this._nameElem.textContent
        const about = this._aboutElem.textContent
        const avatar = this._avatarElem.src
        this._userInfoList = { name, about, avatar };
        return this._userInfoList;
    }

    setUserInfo(elements) {
        this._nameElem.textContent = elements.name;
        this._aboutElem.textContent = elements.about;
        this._avatarElem.src = elements.avatar;

    }
}

export default UserInfo;