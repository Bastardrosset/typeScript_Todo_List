import './navBarStyle.css';

import IconTask from '../IconTasks/IconTasks';
import { NavLink } from 'react-router-dom';
import Logout from '../Auth/Logout';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap'

const Menu = () => {
  return (
  <>
    <Navbar bg="primary" expand="lg" className='mb-5'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav d-flex">
          <Nav className="me-auto w-100">
            <NavLink className="nav-link col-2" aria-current="page" to="/accueil"><IconTask className="float-end"/></NavLink>
            <div className='d-flex flex-column flex-md-row align-items-center'>
              <NavLink className={({isActive}) => (isActive ? "active nav-link" : "notActive")} aria-current="page" to="/list">Consulter toDo-List</NavLink>
              <NavLink className={({isActive}) => (isActive ? "active nav-link" : "notActive")} to="/task">Nouvelle tache</NavLink>    
            </div>
            <div className="">
              <Logout/>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>  
    
  )
}

export default Menu;
