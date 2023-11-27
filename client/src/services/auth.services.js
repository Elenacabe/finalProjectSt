import axios from 'axios'


class AuthService {
    //${import.meta.env.VITE_API_URL}------------------------------------------------------------PREGUNTAR SOS
    constructor() {
        this.api = axios.create({
            baseURL: `http://localhost:5005/api/auth`
        })
    }


    signup(userData) {
        return this.api.post('/signup', userData)
    }

    login(userData) {
        return this.api.post('/login', userData)
    }

    verify(authToken) {
        return this.api.get('/verify',
            { headers: { Authorization: `Bearer ${authToken}` } }
        )
    }

}

const authService = new AuthService()

export default authService