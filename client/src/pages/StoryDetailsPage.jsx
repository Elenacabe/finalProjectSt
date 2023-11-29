import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import storyService from "../services/story.services"
import { Card, ListGroup, Col, Row } from 'react-bootstrap'
import Comments from "../components/Comments/Comments"


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
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }} className="detailsFlash">
                                <Card.Img variant="top" src={storyDetails.cover} />
                                <Card.Body>
                                    <h1 className="orangeFlash">{storyDetails.title}</h1>
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

                                    {/* <Link className="orangeFlash" to={`/usuarios/detalles/${storyDetails.writer._id}`}>Conoce a {storyDetails.writer.username}</Link> : */}



                                </Card.Body>
                            </Card>
                        </Col>
                        <Col >
                            <Comments comments={storyDetails.comments} storyId={storyId}></Comments>
                        </Col>


                    </ Row > :
                    <h1>Loading...</h1>
            }

        </>
    )
}
export default StoryDetailsPage