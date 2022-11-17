import Open from './open.js'
import axios from 'axios'
import React, { Component } from 'react'

const openSlidesData = [
    {
      content:
        "I love movies about horror",
      author: "Jessica",
      source: "online"
    }, {
      content:
        "You know how they say we only use 10% of our brains? Wedding Crashers what a great movie",
      author: "Sean",
      source: "mobile"
    }, {
      content:
        "What did you think of The Batman .",
      author: "Andrew",
      source: "text"
    }, {
      content:
        "There have not been any good comedies lately.",
      author: "Stephanie",
      source: "mobile"
    }, {
      content:
        "What is your favortie movie",
      author: "Thomas",
      source: "text"
    }, 
  ];

class Descriptions extends Component {
    state = {
        movies: []
    }

    componentDidMount(){
        this.getDescriptions()
    }

    getDescriptions = () => {
      axios.get("/all").then(res => {
        console.log(res.data)
      }) 
    }
}   

const Home = () => (
    <div className= "main-container">
        <h3>Connect with others to see what they like</h3>
        <Open slides={openSlidesData} /> 
    </div>  
)

export default Home
