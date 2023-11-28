import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import profileService from "../services/profile.services"
import { Card, ListGroup } from 'react-bootstrap'

function UserDetailsPage() {
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState({})

    console.log("------------------------", userDetails.length)

    useEffect(() => {
        console.log("------------------------", userDetails)
        loadProfileDet()
    }, [])


    const loadProfileDet = () => {
        profileService
            .getDetails(userId)
            .then(({ data }) => {
                setUserDetails(data)

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                userDetails.username !== undefined
                    ?
                    <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={userDetails.avatar} />
                            <Card.Body>
                                <Card.Title>{userDetails.name}</Card.Title>
                                <Card.Text>
                                    {userDetails.about}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {
                                    userDetails.following.length
                                        ?
                                        <>
                                            {userDetails.following.map((e, index) => {

                                                <ListGroup.Item key={index}>{e}</ListGroup.Item>
                                            })}
                                        </> :
                                        <Card.Body>No tengo followers</Card.Body>
                                }

                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Volver</Card.Link>
                            </Card.Body>
                        </Card>

                    </> :
                    <h1>Loading...</h1>
            }

        </>
    )
}
export default UserDetailsPage