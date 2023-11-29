import "./StoryCard.css"
import storyService from '../../services/story.services'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


const StoryCard = () => {
    const [storyList, setStoryList] = useState([])

    useEffect(() => {
        storyService
            .getStoryList()
            .then(({ data }) => {
                setStoryList(data)

            })
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            {!storyList ?
                <h1>cargando loki</h1>
                :

                storyList.map((u) => {
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
export default StoryCard