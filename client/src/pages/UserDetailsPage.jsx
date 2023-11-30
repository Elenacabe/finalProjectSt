import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import profileService from "../services/profile.services"
import { Card, ListGroup } from 'react-bootstrap'
import Loader from "../components/Loader/Loader"

function UserDetailsPage() {
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        loadProfileDetails()
    }, [])

    const loadProfileDetails = () => {
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
                userDetails
                    ?
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
                                    userDetails.following.map((e, index) => {
                                        return <ListGroup.Item key={index}>{e}</ListGroup.Item>
                                    })
                                    :
                                    <Card.Body>No tengo followers</Card.Body>
                            }

                        </ListGroup>
                        <Card.Body>
                            <Link to="/usuarios">Volver</Link>
                        </Card.Body>
                    </Card>
                    :
                    <Loader />
            }
        </>
    )
}
export default UserDetailsPage