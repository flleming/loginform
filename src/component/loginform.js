import React from 'react';
import '../App.css';
import Login from './login';
import Register from "./register"
import {Tabs} from "react-bootstrap";
import {Tab} from "react-bootstrap";
import {Navbar,Nav} from 'react-bootstrap'
import {FaFacebook,FaGitlab,FaNodeJs} from 'react-icons/fa'
class Loginform extends React.Component{
  componentWillMount() {
    localStorage.setItem('valid','false')
    localStorage.setItem('username','')
		localStorage.setItem('_id','')
    localStorage.setItem('_v',0)
    localStorage.setItem('login','')
    localStorage.setItem('image','')
  }
  
    render(){
        return (
        <div>
        <Tabs defaultActiveKey="login" >
      <Tab eventKey="login" title="login" tabClassName="Tab">
        <Login/>
      </Tab>
      <Tab eventKey="register" title="register" tabClassName="Tab" >
        
        <Register/>
      </Tab>
    </Tabs>
    <Navbar  variant="dark" expand="lg" className="container_navbar" fixed="top">
    <Navbar.Brand href="#home"></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home"></Nav.Link>
      <Nav.Link href="https://www.facebook.com/" target='_blanck'><FaFacebook className="facebook"/></Nav.Link>
      <Nav.Link href="https://github.com" target='_blanck'><FaGitlab className="gitlab"/></Nav.Link>
      <Nav.Link href="https://nodejs.org/en/" target='_blanck'><FaNodeJs className="node"/></Nav.Link>
    </Nav>
  </Navbar>
    </div>
    )
    }
}
export default Loginform;