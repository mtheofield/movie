import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
          this.setState({
            redirectTo: '/forum'
          })
        }
      }).catch(error => {
        console.log('there was an error logging in ')
        console.log(error);

      })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="LogInContainer">
          <div className="loginCss">
            <h4>Login</h4>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="form-label" htmlFor="username"></label>
                <input className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password"></label>
                <input className="form-input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group ">
                <button
                  className="btn btn-primary"
                  id="loginButton"
                  onClick={this.handleSubmit}
                  type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Login
