import React from 'react';
import './App.css';
import Page from "./component/page"
import Loginform from './component/loginform'
import PropTypes from 'prop-types'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: 'false',
    }
  }
  componentWillMount() {
    this.setState({
      valid: localStorage.getItem('valid')
    })
  }

  render() {
    const datta = {
      login: localStorage.getItem('login'),
      Password: localStorage.getItem('password'),
      _id: localStorage.getItem('_id'),
      _v: localStorage.getItem('_v'),
      username: localStorage.getItem('username'),
      image: localStorage.getItem('image'),
    }
    if (this.state.valid === 'true') {

      return <Page user={datta} />
    } else {
      return <Loginform />
    }
  }
}
App.propTypes = {
  valid: PropTypes.string
}

export default App