import axios from 'axios'



class ProfileService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/profile`
        })
    }

    getList() {
        return this.api.get('/getAll')
    }


    getDetails(_id) {
        return this.api.get(`/getDetailsProfile/${_id}`)
    }

    editUser(userId) {
        return this.api.post('/edit', userId)
    }
    delete(userData) {
        return this.api.post('/delete', userData)
    }



}

const profileService = new ProfileService()

export default profileService