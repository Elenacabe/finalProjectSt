import profileService from "../../services/profile.services"
import UserCard from "../UserCard/UserCard"
import { Row, Spinner } from 'react-bootstrap'
import { useState, useEffect } from "react"


const UserList = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        profileService
            .getList()
            .then(({ data }) => {
                setUserList(data)

            })
            .catch(err => console.log(err))
    }, [])
    return (
        !userList ?
            <Spinner animation="border" role="status">
                <span className="sr-only"></span>
            </Spinner>
            :
            <>
                <Row className="justify-content-md-center">
                    {
                        userList.map(u => <UserCard {...u} key={u._id}></UserCard>)
                    }
                </Row>
            </>
    )
}
export default UserList