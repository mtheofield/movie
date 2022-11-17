import React from 'react'

const { Component } = React;

class OpenLeftArrow extends Component {
  render() {
    return (
      <a
        href="#"
        className="open__arrow open__arrow--left"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>
    );
  }
}