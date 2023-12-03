import storyService from '../../services/story.services'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'


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
        <>
            {!myStoryList ?
                <Loader />
                :

                myStoryList.map((u) => {
                    return (
                        <div className="eachElement">
                            <div className='storyCard' key={u._id}>
                                <h1 className="textColor">{u.title}</h1>
                                <p>{u.story}</p>
                                <Link className="textColor" to={`/microrrelatos/detalles/${u._id}`}>Detalles</Link>
                                <form action=""></form>
                            </div>
                        </div>)



                })

            }
        </>
    )
}
export default MyStoriesCard