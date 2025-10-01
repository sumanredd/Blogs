"use client";
import { use, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";

function NavBar(props) {
  const router = useRouter();
    const [search,setsearch]=useState("")
    let searchValue=""
    const searchTitle=(event)=>{
        searchValue=event.target.value
    }
    const searchByBtn=(event)=>{
      event.preventDefault()
      router.push(`/?q=${searchValue}`); 
    }
  return (
    <>
      <Navbar expand="sm" className="custom-navbar bg-light px-3">
        <Container fluid>
          <Navbar.Brand href="#home">Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="mobile-navbar">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href={`/admin`}>Admin</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => router.push(`/?q=food`)}>Food</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push(`/?q=travel`)}>Travel</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push(`/?q=technology`)}>Technology</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push(`/?q=lifestyle`)}>Lifestyle</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push(`/?q=education`)}>Education</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="display d-flex ms-auto" style={{ maxWidth: "300px" }}>
              <input 
                type="text" 
                placeholder="Search blogs..." 
                className="form-control search-input"
                onChange={searchTitle}
              />
              <Button onClick={searchByBtn} variant="outline-dark" type="submit" className='text-white btn btn-primary SearchBtn'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* mobile view */}
      <div className="mobile-search px-3 mt-5">
        <Form className="d-flex" style={{ maxWidth: "100%" }}>
          <input 
            type="text" 
            placeholder="Search blogs..." 
            className="form-control search-input"
            onChange={searchTitle}
          />
          <Button onClick={searchByBtn} variant="outline-dark" type="submit" className='btn btn-primary SearchBtn'>Search</Button>
        </Form>
      </div>
    </>
  );
}

export default NavBar;
