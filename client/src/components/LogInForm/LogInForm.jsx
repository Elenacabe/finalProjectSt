import { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"

const LogInForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then((response) => {
                localStorage.setItem('authToken', response.data.authToken)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }


    return (
        <Form className="custom-form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" className="custom-input" />
            </Form.Group>

            <div className="d-grid" >
                <Col md={{ offset: 3, span: 6 }}>
                    <Button md={{ offset: 3, span: 6 }} variant="dark" type="submit">Acceder</Button>
                </Col>
            </div>
        </Form>


    )

}

export default LogInForm