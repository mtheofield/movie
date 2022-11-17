import React from 'react'
import { Link } from 'react-router-dom'

const Response = props => (
    <li className="card border-info mb-3">
        <div className="card-header">{props.title}</div>
        <div className="card-body">
            <p className="card-text">{props.description}</p>
            <p className="card-text">Movie: <strong>{props.movie}</strong></p>
            <Link to={"/story/" + props.id}  className="btn btn-primary" role="button">Add a review</Link>
        </div>
    </li>
)

export default Response