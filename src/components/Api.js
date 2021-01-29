class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;

    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err))
    }


    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err))

    }
    getAllInfo(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    changeUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,        
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err))
    }
    //POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({name,link}){
        return fetch(this._baseUrl + '/cards', {
            method: "POST",
            headers: this._headers,        
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err))       
        
    }
    removeCard(cardId){
        //fetch cards + cardid 
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: "DELETE",
            headers: this._headers,        
            })
            .then(res => {
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err)) 
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setAvatar({avatar}){        
       console.log("API: " + avatar);
       return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,        
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => {
                console.log("Res: " + res);
                if (res.ok) {
                    return res.json();//this makes object out of response
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => console.log('Error! ' + err))       
        
    }
    }



    /*
   
    changeLikeCArdStatus(cardId,like){
        //PUT AND DELETE
    }
    
    */
   
    export default Api;