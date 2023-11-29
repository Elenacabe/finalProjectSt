import { useContext, useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import storyService from "../../services/story.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"


const StoryForm = () => {
    const { loggedUser, logOut } = useContext(AuthContext)

    const [storyData, setStoryData] = useState({
        writer: loggedUser._id,
        title: '',
        story: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setStoryData({ ...storyData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        storyService
            .createStory(storyData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }


    return (
        <>
            {
                loggedUser ?
                    <Form className="custom-form" onSubmit={handleFormSubmit} >
                        <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="writer">
                            <Form.Label>Writer</Form.Label>
                            <Form.Control disabled={true} type="text" value={loggedUser.username} name="writer" readOnly={true} />
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" value={storyData.title} onChange={handleInputChange} name="title" className="custom-input" />
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="story">
                            <Form.Label>Relato</Form.Label>
                            <br />
                            <textarea name="story" id="" cols="60" rows="10" onChange={handleInputChange} value={storyData.story}></textarea>
                            {/* <Form.Control type="text" value={storyData.story} onChange={handleInputChange} name="story" className="custom-input" /> */}
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="dark" type="submit">Registrar historia</Button>
                        </div>
                    </Form>
                    : <h1>logeate</h1>
            }
        </>

    )

}

export default StoryForm