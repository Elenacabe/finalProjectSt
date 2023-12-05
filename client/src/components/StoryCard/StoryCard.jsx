import "./StoryCard.css"
import storyService from '../../services/story.services'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import { Col, Row } from 'react-bootstrap'


const StoryCard = () => {

    const [storyList, setStoryList] = useState([])

    useEffect(() => {
        getAllStories()
    }, [])

    const getAllStories = () => {
        storyService
            .getStoryList()
            .then(({ data }) => {
                setStoryList(data)

            })
            .catch(err => console.log(err))
    }


    return (
        <Row>
            {!storyList ?
                <Loader />
                :

                storyList.map((u) => {
                    return (
                        <Col style={{ margin: '30px' }} className="eachElement " key={u._id}>
                            <div className='storyCard' >
                                <h1 className="textColor">{u.title}</h1>
                                <p>{u.story.slice(0, 40)}...</p>
                                <Link className="textColor" to={`/microrrelatos/detalles/${u._id}`}>Detalles</Link>
                                <form action=""></form>
                            </div>
                        </Col>)
                })

            }
        </Row>

    )
}
export default StoryCard