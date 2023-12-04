import storyService from '../../services/story.services'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'


const MyStoriesCard = () => {

    const { loggedUser } = useContext(AuthContext)
    const [myStoryList, setMyStoryList] = useState([])

    useEffect(() => {
        getAllMyStories()

    }, [])
    const userId = loggedUser._id

    const getAllMyStories = () => {
        storyService
            .getAllMyStories(userId)
            .then(({ data }) => {
                setMyStoryList(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <Row>
            {!myStoryList ?
                <Loader />
                :

                myStoryList.map((u) => {
                    return (
                        <Col className="eachElement" key={u._id}>
                            <div className='storyCard'>
                                <h1 className="textColor">{u.title}</h1>
                                <p>{u.story.slice(0, 30)}...</p>
                                <Link className="textColor" to={`/microrrelatos/detalles/${u._id}`}>Detalles</Link>
                            </div>
                        </Col>)
                })

            }
        </Row>
    )
}
export default MyStoriesCard