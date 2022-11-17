import axios from 'axios'
import React, { Fragment, Component } from 'react';
import Results from './Result'
import { Link } from 'react-router-dom'


class Discussion extends Component {

  state = {
    features: []
  }

  componentDidMount() {
    this.getTopics()
  }

  getTopics = () => {
    axios.get("/all").then(res => {
      this.setState({ features: res.data })
      console.log(this.state.features)
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Fragment>
        <div className="categories">
          <ul>
            <li><Link to="/forum">All</Link></li>
            <li><Link to="/forum/action">Action</Link></li>
            <li><Link to="/forum/comedy">Comedy</Link></li>
            <li><Link to="/forum/thriller">Thriller</Link></li>
            <li><Link to="/forum/crime">Crime</Link></li>
            <li><Link to="/forum/sports">Sports</Link></li>
            <li><Link to="/forum/romance">Romance</Link></li>
          </ul>
        </div>
        <div className="jumbotron jumbotron-fluid" id="alltron">
          <div className="container">
            <h1 className="display-4 text-center">All Stories</h1>
            <p className="lead text-center">These are all the stories...</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="createNew float-right">
              {loggedIn ? (
                <Link to="/review" className="btn btn-warning float-right" role="button">Create a new review</Link>
              ) : (
                <Link to="/login" className="btn btn-warning float-right" role="button">Your review here</Link>
              )}
            </div>

            <div className="posts col-md-12">
              <ul>
                {this.state.features.map(feature => (

                  <Results
                    key={feature._id}
                    id={feature._id}
                    title={feature.title}
                    movie={feature.movie}
                    description={feature.description}
                  />

                ))}
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Discussion;