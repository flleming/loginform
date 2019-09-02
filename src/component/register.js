import React from 'react';
import './login.css';
// import firebase from 'firebase/app';
import 'firebase/database';
// import {dbconfig} from '../config/config'
import { ToastsContainer, ToastsStore } from 'react-toasts';
// import {Link} from 'react-router-dom'
import axios from 'axios';

class Register extends React.Component {



	constructor(props) {
		super(props)
		this.state = {
			users: [],
			hii: false,
			authlogin: false,
			authpassword: false,
			login: '',
			password: '',
			valid: true,
			input: '',
			poper: false
		}


		// if (!firebase.apps.length) {
		// 	this.app = firebase.initializeApp(dbconfig);
		// }
		this.handlerlogin = this.handlerlogin.bind(this)
		this.handlerpassword = this.handlerpassword.bind(this)
		this.loging = this.loging.bind(this)
		// this.writeUserData=this.writeUserData.bind(this)
	}

	handlerlogin(e) {
		this.setState({
			login: e.target.value
		})
		if (this.state.login !== '') {
			this.setState({
				authlogin: true,
			})
		}
	}
	handlerpassword(e) {

		this.setState({
			password: e.target.value
		});
		if (this.state.password !== '') {
			this.setState({
				authpassword: true,
			})
		}
	}

	loging(e) {
		e.preventDefault();
		if (this.state.authlogin && this.state.authpassword && this.state.valid) {
			const user = {
				login: this.state.login,
				password: this.state.password
			}
			axios.post('http://localhost:5000/users/add', user)
				.then(res => {
					console.log('its done')
				})
				.catch(() => {
					this.setState({ hii: false })
					ToastsStore.error("email invalid")
				})

			// this.writeUserData(this.state.login,this.state.password)
			this.setState({
				hii: true
			})
		}
		if (!this.state.valid) {
			ToastsStore.error("email invalid")
		}
	}

	// writeUserData(email, password) {
	// 	firebase.database().ref('UsersList/').push({
	// 		email,
	// 		password
	// 	}).then((data) => {
	// 		//success callback
	// 		console.log('data ', data)
	// 	}).catch((error) => {
	// 		//error callback
	// 		console.log('error ', error)
	// 	})
	// }
	componentWillUnmount() {
		// firebase.database().ref('UsersList/').off('child_changed');        
	}
	verif(e) {
		this.setState({
			login: e.target.value
		})
		if (this.state.mail !== '') {
			this.setState({
				authlogin: true,
			})
		}
		var inputt = e.target.value
		this.setState({
			input: inputt,
		})
		var n = this.state.input.search('@')
		if (n === -1) {
			this.setState({
				valid: false,
			})

		} else {
			this.setState({
				valid: true
			})
		}
	}
	componentWillMount() {
		this.setState({
			hii: false
		})
	}


	render() {

		return (

			<form className="login-form">
				<h1>Register</h1>
				<input type="email" name="" placeholder="email" className="hello" onChange={e => this.verif(e)} />
				<input type="password" name="" placeholder="Password" onChange={e => this.handlerpassword(e)} />
				<input type="submit" name="" value="Register" onClick={this.loging} variant="success" />
				<h4 className={!this.state.hii ? "h33" : ""}>you are registred with success</h4>
				<ToastsContainer store={ToastsStore} />
			</form>

		);
	}
}

export default Register;