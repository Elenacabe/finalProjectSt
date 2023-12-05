import storyService from "../../services/story.services"
import { useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"
import "./Valoration.css"
import { Card, Row, Col } from "react-bootstrap"

function Valorations({ storyId, valorations }) {
    const [average, setAverage] = useState(null)
    const [valoration, setValoration] = useState(valorations)
    const [newValoration, setNewValoration] = useState(valorations)
    const { loggedUser } = useContext(AuthContext)
    const [length, setLength] = useState(valorations.length)

    useEffect(() => {
        getValoration()
    }, [newValoration])

    const getValoration = () => {
        storyService
            .showValoration(storyId)
            .then(({ data }) => {
                if (!isNaN(data)) {
                    setAverage(data)
                }
            })
            .catch((err) => console.log('No hemos podido registrar el voto'))
    }

    const newValorationHandler = (e) => {

        e.preventDefault()
        const selectedVal = e.target.value

        storyService
            .createValoration(storyId, selectedVal, loggedUser._id)
            .then((response) => {
                setNewValoration(response.data)
                setLength(length + 1)
                setValoration('')
            })
    }


    return (

        <Card className="valorationGroup">
            {length == 1 && <p>{length} voto</p>}
            {length > 1 && <p>{length} votos</p>}

            <p>{average} puntos </p>

            <div className="btn-group" role="group" aria-label="Basic example">

                <button className="buttonVal" value={1} onClick={newValorationHandler}>😾</button>
                <button className="buttonVal" value={2} onClick={newValorationHandler}>😿</button>
                <button className="buttonVal" value={3} onClick={newValorationHandler}>😼</button>
                <button className="buttonVal" value={4} onClick={newValorationHandler}>😺</button>
                <button className="buttonVal" value={5} onClick={newValorationHandler}>😻</button>

            </div>

        </Card >

    )
}
export default Valorations