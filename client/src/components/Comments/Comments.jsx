import { useContext, useState } from "react"
import commentService from '../../services/comment.services'
import { AuthContext } from "../../contexts/auth.context"
import './Comments.css'


function Comments({ storyId, comments }) {

    const [comment, setComment] = useState('')
    const [newComments, setComments] = useState(comments)
    const { loggedUser } = useContext(AuthContext)

    const onClickHandler = () => {
        commentService
            .createComment({ comment, author: loggedUser._id, storyId })
            .then(({ data }) => {
                setComments((comments) => [data, ...comments])
                setComment('')
            })
    }

    const onChangeHandler = (e) => {
        const { value } = e.target
        setComment(value)
    }

    return (
        <div className="main-container">
            <div className="comments-section">
                {
                    newComments.map((eachComment) => (
                        <div className="comment-container" key={eachComment._id}>{eachComment.comment} By {eachComment.author}</div>
                    ))
                }
            </div>
            <div className="comment-flexbox">
                <h3 className="comment-text orangeFlash">Comentario</h3>
                <textarea
                    value={comment}
                    onChange={onChangeHandler}
                    className="input-box"
                />
                <button onClick={onClickHandler} className="comment-button">
                    Subir
                </button>
            </div>
        </div>
    )
}

export default Comments