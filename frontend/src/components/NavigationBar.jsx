import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Axios.post('http://localhost:8000/api/auth/logout')
    .then(() => {
      navigate('/login');
    })
    .catch(error => console.log(error));
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/add-book">Add Book</Nav.Link>
            <Nav.Link href="/add-student">Add Student</Nav.Link>
            <Nav.Link href="/lend-book">Lend Book</Nav.Link>
            <Nav.Link href="/pay-fees">Pay Fees</Nav.Link>

            <Nav.Link href="/students">Sutdents</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/borrowed-books">Borrowed Books</Nav.Link>
          </Nav>
          <Nav>
          <NavDropdown title={`Profile`} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;