import React from 'react';
import ReactDOM from "react-dom";
import Page from "./page";
import './login.css';
import 'firebase/database'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import axios from 'axios';


class Login extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			mail: '',
			pass: '',
		}
		// // if (!firebase.apps.length) {
		// // 	this.app = firebase.initializeApp(dbconfig);
		// }
		// this.readUserData = this.readUserData.bind(this)
		this.handlerlogin = this.handlerlogin.bind(this)
		this.handlerpassword = this.handlerpassword.bind(this)
		this.loging = this.loging.bind(this)

	}

	handlerlogin(e) {
		this.setState({
			mail: e.target.value
		})
	}

	handlerpassword(e) {
		this.setState({
			pass: e.target.value
		});
	}
	loging(e) {
		e.preventDefault();
		const data = {
			login: this.state.mail,
			password: this.state.pass
		}


		axios.post('http://localhost:5000/users/login', data)
			.then((res) => {
				if (res) {
					localStorage.setItem('username', res.data.username)
					localStorage.setItem('_id', res.data._id)
					localStorage.setItem('_v', 0)
					localStorage.setItem('valid', 'true')
					localStorage.setItem('image', res.data.image)
					localStorage.setItem('token', res.data.token)
					ReactDOM.render(<Page user={res.data} />, document.getElementById('root'));
				}
				else {
					ToastsStore.error("errooor!")
				}
			}).catch(() => ToastsStore.error("errooor!"))
		//this.readUserData(this.state.mail,this.state.pass)
	}
	// readUserData(email, password) {

	// 	var ref = firebase.database().ref("UsersList");

	// 	ref.orderByChild("email").equalTo(email).once("child_added").then(res => res.val())
	// 		.then(data => {
	// 			if(data.password===password){
	// 				this.setState({
	// 					authlogin:true
	// 				})
	// 			}
	// 			this.setState({ authlogin: true });
	// 		}).catch(err=>{
	// 			console.error(err)
	// 		})

	// }
	componentWillUnmount(nextProps, nextState) {

		// firebase.database().ref('UsersList/').off('child_changed');        
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('login', nextState.mail)
	}
	render() {
		return (


			<form className="login-form">
				<h1>Login</h1>
				<input type="email" name="" placeholder="email" onChange={e => this.handlerlogin(e)} />
				<input type="password" name="" placeholder="Password" onChange={e => this.handlerpassword(e)} />
				<input type="submit" name="" value="Login" onClick={this.loging} />
				<ToastsContainer store={ToastsStore} />
			</form>

		);
	}
}

export default Login;

