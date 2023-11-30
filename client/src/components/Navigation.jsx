import { useContext, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap/'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context';



const Navigation = () => {
    const { loggedUser, logOut } = useContext(AuthContext)
    console.log('SOY EL USERRRRRRRRR----------->', { loggedUser })//ATENCION BORRAR
    const handleLogOut = () => {
        logOut()
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand >
                    {
                        loggedUser
                            ?
                            <>
                                <NavItem><img src={loggedUser.avatar} alt="Avatar" className='userAvatar' ></img></NavItem>
                                <Link to="/" className="nav-item nav-link">LongStoryShort</Link>
                            </>
                            :
                            <Link to="/" className="nav-item nav-link">LongStoryShort</Link>

                    }
                </Navbar.Brand>

                {
                    loggedUser
                        ?
                        <NavItem>Hola {loggedUser.username.toUpperCase()}</NavItem>
                        :
                        <></>
                }
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            loggedUser
                                ?
                                <>
                                    <NavLink to="/usuarios" className="nav-item nav-link">Comunidad</NavLink>
                                    <NavLink to="/crearMicrorrelato" className="nav-item nav-link" >Subir relato</NavLink>
                                    <NavDropdown title="Otras opciones" id="navbarScrollingDropdown">
                                        <NavDropdown.Item>
                                            <Link to={`/usuarios/detalles/${loggedUser._id}`}>Perfil</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/profile/Microrrelatos">Mis Microrrelatos</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogOut}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </> :
                                <>
                                    <NavLink to="/signUp" className="nav-item nav-link">Registro</NavLink>
                                    <NavLink to="/logIn" className="nav-item nav-link">Acceso</NavLink>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )

};

export default Navigation
