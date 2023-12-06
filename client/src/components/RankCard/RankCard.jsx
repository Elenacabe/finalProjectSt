import { Container } from 'react-bootstrap'

const RankCard = (storiesArr) => {
    return (

        <Container>
            {
                storiesArr.map((storySort) => {
                    return (<>
                        <h1>Título: <span>{storySort.title}</span></h1>
                        <p >{storySort.story}</p>
                        <br />
                    </>)
                })
            }
        </Container>
    )
}
export default RankCard