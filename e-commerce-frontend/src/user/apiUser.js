import {API} from '../config'

export const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};

export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};


// without this a User will not see cchanges to their profile until they log out
export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', auth)
            next();
        }
    }
};