import profileService from "../../services/profile.services"
import UserCard from "../UserCard/UserCard"
import { Row } from 'react-bootstrap'
import { useState } from "react"


const UserList = () => {
    const [userList, setUserList] = useState([])
    profileService
        .getList()
        .then(({ data }) => {
            setUserList(data)

        })
        .catch(err => console.log(err))
    return (
        !userList ?
            <h1>cargando loki</h1>
            :
            <>
                <Row>
                    {
                        userList.map(u => <UserCard {...u} key={u._id}></UserCard>)
                    }
                </Row>
            </>
    )
}
export default UserList