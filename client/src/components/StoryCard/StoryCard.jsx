import "./StoryCard.css"
import storyService from '../../services/story.services'
import { useState } from "react"
import { Link } from "react-router-dom"


const StoryCard = () => {
    const [storyList, setStoryList] = useState([])

    storyService
        .getStoryList()
        .then(({ data }) => {
            setStoryList(data)
            console.log(storyList[0].title)

        })
        .catch(err => console.log(err))
    return (
        <>
            {!storyList ?
                <h1>cargando loki</h1>
                :

                storyList.map((u) => {
                    return (
                        <div className='cardo' key={u._id}>
                            <h1>{u.title}</h1>
                            <p>{u.story}</p>
                            <Link to={`/microrrelatos/detalles/${u._id}`}>Detalles</Link>
                        </div>)


                })

            }
        </>
    )
}
export default StoryCard