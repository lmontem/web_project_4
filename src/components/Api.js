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
        
        
        //body: JSON.stringify({name: name link:link})
        //call after click submit button in index.js api.addCArd(data).then(res=>{put Card class here data:res})
     }
}


    /*
    removeCArd(cardId){
        //fetch cards + cardid 
        //method: DELETE
    }
    changeLikeCArdStatus(cardId,like){
        //PUT AND DELETE
    }
    
    setAvatar(){
        //method: PATCH
    }*/
    //only need one intance of api class, they give code at end of project info,
    // only change group # and my personal token in headers/authorization
    //then export instance of api to index.js (not class)

    //Token: 36dac5ff-0396-44c7-b439-6ad6e17c0bf0
    //Group ID: group-8
    export default Api;