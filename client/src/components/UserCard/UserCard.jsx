import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'

const UserCard = ({ username, avatar, about, _id }) => {
    return (
        <>
            <div>Soy UserCard</div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Card.Text>
                        {about}

                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">

                        <Link to={`/usuarios/detalles/${_id}`}>Detalles</Link>
                    </Card.Subtitle>

                </Card.Body>
            </Card >
        </>)
}
export default UserCard