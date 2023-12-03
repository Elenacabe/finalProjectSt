import storyService from "../../services/story.services"
import { useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"
import "./Valoration.css"
import { Card } from "react-bootstrap"

function Valorations({ storyId, valorations }) {
    const [average, setAverage] = useState(null)
    const [valoration, setValoration] = useState(valorations)
    const [newValoration, setNewValoration] = useState(valorations)
    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        storyService
            .showValoration(storyId)
            .then(({ data }) => {
                if (!isNaN(data)) {
                    setAverage(data)
                }
            })
            .catch((err) => console.log('No hemos podido registrar el voto'))
    }, [newValoration])
    const newValorationHandler = (e) => {

        e.preventDefault()
        const selectedVal = e.target.value
        console.log(selectedVal)

        storyService
            .createValoration(storyId, selectedVal, loggedUser._id)
            .then((response) => {
                console.log("he clickadoooooooooooooooooooooooooooooooooooooooooo", response)
                setNewValoration(response.data)
                setValoration('')
            })
    }


    return (
        <>
            <div >
                {

                    average !== NaN
                        ?
                        <p>{average}</p>
                        :
                        <p>no hay votos</p>
                }
            </div>


            <Card>
                <div>
                    <button value={1} className="buttonLike" onClick={newValorationHandler}>😾</button>
                    <button value={2} onClick={newValorationHandler}>😿</button>
                    <button value={3} onClick={newValorationHandler}>😼</button>
                    <button value={4} onClick={newValorationHandler}>😺</button>
                    <button value={5} onClick={newValorationHandler}>😻</button>
                </div>
            </Card >
        </>
    )
}
export default Valorations