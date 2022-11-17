import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Post from './Post'

class Comment extends Component {

  state = {
    film: "",
    movie: "",
    comment: "",
    comments: [],
    loggedIn: false,
    username: null
  }

  componentDidMount() {
    this.getUser()
    this.getCinema()
    this.getComments()
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get response ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get the user ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('There is no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  getCinema = () => {
    axios.get("/api/film/" + this.props.match.params.id).then(res => {
      console.log(res.data)
      this.setState({ film: res.data.description, movie: res.data.movie })
    })
  }

  getComments = () => {
    axios.get("/api/comment/" + this.props.match.params.id).then(res => {
      console.log(res.data)
      this.setState({ comments: res.data })
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("welcome here!");

    const post = { movie: this.state.username, body: this.state.comment, postId: this.props.match.params.id }

    axios.post("/submit/" + this.props.match.params.id, post).then(res => {
      console.log(res.data)
    })

    this.setState({
      comment: ""
    })
    this.getComments()
  }

  render() {
    const loggedIn = this.state.loggedIn;
    return (
      <div>
        <Post
          description={this.state.film}
          movie={this.state.movie}
        />
        {this.state.comments.map(comment => (
          <Post
            description={comment.body}
            movie={comment.movie}
          />

        ))}
        {loggedIn ? (
          <form className="commentForm">
            <div className="col-12 mt-5">
              <textarea className="form-input"
                type="text"
                id="commentBox"
                name="description"
                rows="10"
                cols="150"
                value={this.state.comment}
                onChange={(event) => this.setState({ comment: event.target.value })}
              />
            </div>
            <button
              className="btn btn-primary col-1"
              id="addCommentButton"

              onClick={(event) => this.handleSubmit(event)}
              type="submit">Submit</button>
          </form>
        ) : (
          <Link to={"/login"} className="btn btn-primary" id="logintoadd" role="button">Please sign in</Link>
        )}
      </div>
    )
  }
}

export default Comment;