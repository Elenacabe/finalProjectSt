import { Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"


const UserCard = ({ username, avatar, about, _id }) => {
    const { loggedUser, logOut } = useContext(AuthContext)


    return (
        <>
            <Card style={{ width: '18rem', margin: '20px' }} className="mb-3">
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Card.Text>
                        {about}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Link to={`/usuarios/detalles/${_id}`} className="btn btn-success mr-2">Detalles</Link>
                        {
                            loggedUser.role == 'ADMIN' || loggedUser._id == _id
                                ?
                                <Button variant="danger" style={{ margin: '20px' }} >Delete</Button>//hacer form
                                :
                                <></>
                        }
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </>)
}
export default UserCard