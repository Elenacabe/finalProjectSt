import storyService from "../../services/story.services"
import { useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"
import { Card } from "react-bootstrap"

function Valorations({ storyId, valorations }) {
    const [average, setAverage] = useState(0)
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

    // const onSubmit = (e) => {
    //     const { value } = e.target


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
                    <button value={1} onClick={newValorationHandler}>Votar 1</button>
                    <button value={2} onClick={newValorationHandler}>Votar 2</button>
                    <button value={3} onClick={newValorationHandler}>Votar 3</button>
                    <button value={4} onClick={newValorationHandler}>Votar 4</button>
                    <button value={5} onClick={newValorationHandler}>Votar 5</button>
                </div>
            </Card>
        </>
    )
}
export default Valorations