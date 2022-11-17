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

class OpenSlide extends Component {
  render() {
    return (
      <li
        className={
          this.props.index === this.props.activeIndex
            ? "open__slide open__slide--active"
            : "open__slide"
        }
      >
        <p className="open-slide__content">{this.props.slide.content}</p>

        <p>
          <strong className="open-slide__author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="open-slide__source">
            {this.props.slide.source}
          </small>
        </p>
      </li>
    );
  }
}

class Open extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  render() {
    return (
      <div className="open">
        <OpenLeftArrow onClick={e => this.goToPrevSlide(e)} />

        <ul className="open__slides">
          {this.props.slides.map((slide, index) =>
            <OpenSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
            />
          )}
        </ul>

        <OpenRightArrow onClick={e => this.goToNextSlide(e)} />

        <ul className="open__indicators">
          {this.props.slides.map((slide, index) =>
            <OpenIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              isActive={this.state.activeIndex==index} 
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default Open;