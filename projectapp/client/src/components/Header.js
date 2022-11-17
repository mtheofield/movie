import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logged out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
      console.log('There was an error logging out error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('header render, props: ')
    console.log(this.props);

    return (
      <nav className="header header-expand-sm bg-light header-light">
        <div id="top-filler"></div>
        <a className="header-brand" href="/">
          <img src="https://img.freepik.com/free-vector/cinema-film-festival-movie-poster-background_1017-33461.jpg" width="50" height="50" alt="" />
        </a>
        <h1 className="App-title">Movie Social Media</h1>
        {loggedIn ? (
          <section className="header-section">
            <Link to="/forum" className="btn btn-link ml-5">
              <span className="text-secondary">reviews</span>
            </Link>
            <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
              <span className="text-secondary">logout</span></Link>
          </section>
        ) : (
          <section className="header-section">
            <Link to="/" className="btn btn-link text-secondary ml-5">
              <span className="text-secondary">home</span>
            </Link>
            <Link to="/login" className="btn btn-link text-secondary">
              <span className="text-secondary">login</span>
            </Link>
            <Link to="/signup" className="btn btn-link">
              <span className="text-secondary">sign up</span>
            </Link>
            <Link to="/discussion" className="btn btn-link">
              <span className="text-secondary">movies</span>
            </Link>
          </section>
        )}
      </nav>

    );

  }
}

export default Header
