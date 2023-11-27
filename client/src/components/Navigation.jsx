import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap/'
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand > <Link to="/">LongStoryShort</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link>
                            <Link to="/microrrelatos">Relatos</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/usuarios">Usuarios</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/signUp">Registro</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/logIn">Acceso</Link>
                        </Nav.Link>
                        <NavDropdown title="Otras opciones" id="navbarScrollingDropdown">
                            <NavDropdown.Item>
                                <Link to="/miPerfil">Perfil</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/profile/Microrrelatos">Mis Microrrelatos</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

};

export default Navigation
