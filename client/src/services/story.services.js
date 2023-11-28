import axios from "axios"

class StoryService {
    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/stories`
        })
    }


    createStory(storyData) {
        return this.api.post('/newStory', storyData)
    }

    getStoryList() {
        return this.api.get('/getAllStories')
    }

    getDetails(_id) {
        return this.api.get(`/details/${_id}`)
    }

}


const storyService = new StoryService()

export default storyService