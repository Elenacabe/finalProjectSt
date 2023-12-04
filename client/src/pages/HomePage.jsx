import { Container } from "react-bootstrap"
import StoryCard from "../components/StoryCard/StoryCard"

const HomePage = () => {
    //DEFAULT:OLDESTTTTTTTTTT----->FILTRO NEWEST Y RANKING?????
    return (

        <Container>
            <h2 className="orangeT">Lee los microrrelatos:</h2>
            <StoryCard />
        </Container>

    )
}
export default HomePage