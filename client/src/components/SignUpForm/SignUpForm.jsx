import { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
// import "./SignUpForm.css"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"


const SignUpForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        birthDate: '',
        about: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }


    return (
        <Form className="custom-form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="birthDate">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" value={signupData.birthDate} onChange={handleInputChange} name="birthDate" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="about">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={signupData.about} onChange={handleInputChange} name="about" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" className="custom-input" />
            </Form.Group>

            <div className="d-grid" >
                <Col md={{ offset: 3, span: 6 }}>
                    <Button md={{ offset: 3, span: 6 }} variant="dark" type="submit">Registrarme</Button>
                </Col>
            </div>
            {/* <div className="d-grid gap-2">
                <Button as={Col} md={{ offset: 3, span: 6 }} variant="dark" type="submit">
                    Registrarme
                </Button>
            </div> */}
        </Form>

    )

}

export default SignUpForm