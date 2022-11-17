import axios from 'axios'
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


class Review extends Component {

  state = {
    title: "",
    author: "",
    description: "",
    category: "romance",
    redirectTo: null
  }

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state)

    const post = { title: this.state.title, movie: this.props.username, category: this.state.category, description: this.state.description }

    axios.post("/post", post).then(res => {
      console.log(res.data)
    })

    this.setState({
      title: "",
      description: "",
      redirectTo: '/discussion'
    })

  }

  render() {
    const loggedIn = this.props.loggedIn;


    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          {loggedIn ? (
            <div>
              <div className="form-group reviewform container">
                <div className="categoryPick">
                  <label className="form-label1" htmlFor="title">Pick a Category:    </label>
                  <select name="category" className="custom-select custom-select-md" value={this.state.category} onChange={this.handleInputChange}>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="thriller">Thriller</option>
                    <option value="crime">Crime</option>
                    <option value="sports">Sports</option>
                    <option value="romance">Romance</option>
                  </select>
                </div>
                <div className="titlePick">
                  <label className="form-label2" htmlFor="title">Title:</label>
                  <div>
                    <input className="form-input1"
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="descriptionPick">
                  <label className="form-label3" htmlFor="description">Film</label>
                  <div>
                    <textarea className="form-input2"
                      type="text"
                      id="description"
                      name="description"
                      rows="15"
                      cols="100"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <button onClick={this.handleFormSubmit}>Submit</button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="title">Pick a Category</label>
                <select name="category" className="custom-select custom-select-md" value={this.state.genre} onChange={this.handleInputChange} disabled>
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="thriller">Thriller</option>
                  <option value="crime">Crime</option>
                  <option value="sports">Sports</option>
                  <option value="romance">Romance</option>
                </select>
                <label className="form-label" htmlFor="title">Title:</label>
                <div>
                  <input className="form-input"
                    type="text"
                    id="title"
                    name="title"
                    value={this.state.title}
                    disabled
                  />
                </div>
                <label className="form-label" htmlFor="description">Film:</label>
                <div className="textarea1">
                  <textarea className="form-input"
                    type="text"
                    id="description"
                    name="description"
                    rows="15"
                    cols="100"
                    value="You need to sign in to tell us about a film"
                    disabled
                  />
                </div>
              </div>
              <button onClick={this.handleFormSubmit} disabled>Submit</button>
            </div>

          )}
        </div>
      )
    }
  }
}

export default Review;