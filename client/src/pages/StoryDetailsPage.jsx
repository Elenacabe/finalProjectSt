import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import storyService from "../services/story.services"
import { Card, ListGroup } from 'react-bootstrap'

function StoryDetailsPage() {
    const { storyId } = useParams()
    const [storyDetails, setStoryDetails] = useState({})


    useEffect(() => {
        loadStoryDet()
    }, [])


    const loadStoryDet = () => {
        storyService
            .getDetails(storyId)
            .then(({ data }) => {
                setStoryDetails(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                storyDetails.title !== undefined
                    ?
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={storyDetails.cover} />
                            <Card.Body>
                                <Card.Title>{storyDetails.title}</Card.Title>
                                <Card.Text>
                                    {storyDetails.story}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {
                                    storyDetails.likes.length
                                        ?
                                        <>
                                            {storyDetails.likes.map((e, index) => {

                                                <ListGroup.Item key={index}>{e}</ListGroup.Item>
                                            })}
                                        </> :
                                        <Card.Body>No tengo likes </Card.Body>
                                }

                            </ListGroup>
                            <Card.Body>
                                <Link to={`/usuarios/detalles/${storyDetails.writer._id}`}>Conoce a ${storyDetails.writer.username}</Link>

                            </Card.Body>
                        </Card>

                    </> :
                    <h1>Loading...</h1>
            }

        </>
    )
}
export default StoryDetailsPage