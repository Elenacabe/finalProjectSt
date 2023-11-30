import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import storyService from "../services/story.services"
import { Card, ListGroup, Col, Row } from 'react-bootstrap'
import Comments from "../components/Comments/Comments"
import Loader from "../components/Loader/Loader"

function StoryDetailsPage() {
    const { storyId } = useParams()
    const [storyDetails, setStoryDetails] = useState()

    useEffect(() => {
        loadStoryDetails()
    }, [])

    const loadStoryDetails = () => {
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
                storyDetails
                    ?
                    <Row>
                        <Col md={{ span: 6 }}>
                            <Card className="detailsFlash">
                                <Card.Img variant="top" src={storyDetails.cover} />
                                <Card.Body>
                                    <h1 className="orangeFlash">{storyDetails.title}</h1>
                                    <Card.Text>
                                        {storyDetails.story}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {/* TODO: DESACOPLAR LISTADO DE LIKES */}
                                    {
                                        storyDetails.likes.length
                                            ?
                                            storyDetails.likes.map((e, index) => {
                                                return <ListGroup.Item key={index}>{e}</ListGroup.Item>
                                            })
                                            :
                                            <Card.Body>No tengo likes</Card.Body>
                                    }
                                </ListGroup>
                                <Card.Body>
                                    {/* <Link className="orangeFlash" to={`/usuarios/detalles/${storyDetails.writer._id}`}>Conoce a {storyDetails.writer.username}</Link> : */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <Comments comments={storyDetails.comments} storyId={storyId}></Comments>
                        </Col>

                    </ Row > :
                    <Loader />
            }

        </>
    )
}
export default StoryDetailsPage