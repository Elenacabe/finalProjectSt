import { useContext, useState } from "react"
import commentService from '../../services/comment.services'
import { AuthContext } from "../../contexts/auth.context"
import './Comments.css'


function Comments() {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const { loggedUser, logOut } = useContext(AuthContext)

    const onClickHandler = () => {
        commentService
            .createComment({ comment: comment, author: loggedUser._id })
            .then(
                (createdComment) => {
                    setComments((comments) => [...comments, createdComment])
                    setComment('')
                }
            )
    }

    const onChangeHandler = (e) => {
        setComment(e.target.value)
    }
    return (
        <div className="main-container">
            <div className="comments-section">
                {comments.map((eachComment) => (
                    <div className="comment-container">{eachComment.comment} By {eachComment.author}</div>
                ))}
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