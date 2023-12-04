import { useEffect, useState, useContext } from "react"
import { Link, useParams } from 'react-router-dom'
import profileService from "../services/profile.services"
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import Loader from "../components/Loader/Loader"
import EditProfileForm from "../components/EditProfileForm/EditProfileForm"
import { AuthContext } from "../contexts/auth.context"

function UserDetailsPage() {
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState()
    const { loggedUser } = useContext(AuthContext)

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
                    <Row className="ownRow">
                        <Col className="ownCol" md={{ offset: 2, span: 1 }}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={userDetails.avatar} />
                                <Card.Body>
                                    <Card.Text><h1>{userDetails.username}</h1></Card.Text>
                                    <Card.Text>
                                        {userDetails.about}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Link className='orangeT' to="/usuarios">Volver</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col >
                            {loggedUser._id == userDetails._id && <EditProfileForm />}
                        </Col>
                    </Row>
                    :
                    <Loader />
            }

        </>
    )
}
export default UserDetailsPage