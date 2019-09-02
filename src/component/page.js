import React from "react";
import ReactDOM from "react-dom";
import './page.css'
import axios from 'axios'
import Loginform from './loginform'
import { Table } from 'react-bootstrap'
import { FaAngleDown, FaAngleRight, FaCameraRetro } from 'react-icons/fa'
import { Navbar, Container, Nav, Form, Button, Media } from 'react-bootstrap'
import { Chip, Avatar } from '@material-ui/core'


class Page extends React.Component {

    state = {

        users: this.props.user,
        user: [],
        drop: 0,
        sort: 0,
        hide: 0,
        logo: '',
    }
    constructor(props) {
        super(props)

        this.drop = this.drop.bind(this)
        this.onSort = this.onSort.bind(this)
        this.backto = this.backto.bind(this)
        this.onChange = this.onChange.bind(this)

    }
    componentWillMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({
                    user: res.data,
                    logo: 'http://localhost:5000/' + localStorage.getItem('image'),
                });
            })
    }

    logout() {
        ReactDOM.render(<Loginform />, document.getElementById('root'));
    }
    drop() {
        var x = this.state.drop + 1
        this.setState(
            { drop: x })
    }
    onSort(event, sortKey) {
        const data = this.state.user;
        data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({ user: data })
    }
    backto() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                var x = res.data
                this.setState({
                    user: x
                })
            })
    }
    onChange(e) {
        let files = e.target.files
        this.setState({
            loading: true,
        })
        const url = 'http://localhost:5000/users/addimage/' + this.state.users._id
        const formData = new FormData()
        formData.append('images', files[0])
        return axios.put(url, formData,{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': localStorage.getItem('token')
			}
		})
            .then(res => {
                localStorage.setItem('image', res.data)
                this.setState({
                    logo: 'http://localhost:5000/' + res.data,
                });


            })
    }

    render() {

        return (
            <Container className="container">
                <Media>

                    <div className="row">
                        <div className="small-12 medium-2 large-2 columns">
                            <div className="circle">
                                <img
                                    className="profile-pic mr-3"
                                    width={64}
                                    height={64}
                                    src={this.state.logo}
                                    alt="hahaha" />

                            </div>
                            <div className="p-image">
                                <label htmlFor="myuniqueid">
                                    <FaCameraRetro style={{ cursor: 'pointer' }} />
                                </label>
                                <input className="file-upload" type="file" accept="image/*" id="myuniqueid" onChange={(e) => { this.onChange(e) }} />
                            </div>
                        </div>
                    </div>

                    <Media.Body>
                        <h5>{localStorage.getItem('username') === 'undefined' ? 'his or her username not found' : localStorage.getItem('username')}</h5>

                    </Media.Body>
                </Media>
                <Navbar bg="dark" variant="dark" expand="lg" className="container_navbar" fixed="top">
                    <Navbar.Brand href=""><Chip color='primary' avatar={<Avatar src={this.state.logo} />} label={this.state.users.username} /></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="" onClick={e => this.onSort(e, 'login')}>sort by login</Nav.Link>
                        <Nav.Link href="" onClick={e => this.onSort(e, 'password')}>sort by password</Nav.Link>
                    </Nav>
                    <Form inline>

                        <Button variant="outline-primary" onClick={this.logout}>logout</Button>
                    </Form>
                </Navbar>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th># <FaAngleRight onClick={() => this.drop()} className={this.state.drop % 2 === 0 ? "f" : "hidden"} /><FaAngleDown className={this.state.drop % 2 === 0 ? "hidden" : "f"} onClick={() => this.drop()} /> </th>
                            <th>login</th>
                            <th>password</th>

                        </tr>
                    </thead>
                    <tbody className={this.state.drop % 2 === 0 ? "hidden" : ""}>
                        {this.state.user.map((userr) => {
                            return (<tr key={this.state.user.indexOf(userr)} >
                                <td>{this.state.user.indexOf(userr)}</td>
                                <td>{userr.login}</td>
                                <td>{userr.password}</td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>


            </Container>
        )
    }

}
export default Page;