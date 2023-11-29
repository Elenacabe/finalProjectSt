import { Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect } from "react"
import profileService from "../../services/profile.services"
import { useNavigate } from "react-router-dom"


const UserCard = ({ username, avatar, about, _id }) => {
    const { loggedUser, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)





    const handleDelete = () => {



        profileService
            .deleteUser(_id)
            .then(() => {
                if (loggedUser.role === "ADMIN" && loggedUser._id !== _id) {
                    console.log("soy admin y no soy ese")
                    navigate('/')
                } else {
                    navigate('/')
                }


            })
            .catch(err => console.log(err))


    }




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
                                <Button onClick={handleDelete} className="btn btn-danger mr-2" style={{ margin: '20px' }} >Borrar</Button>//hacer form
                                :
                                <></>
                        }
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </>)
}
export default UserCard