import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Menu from './Menu';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    autoBind(this);
  }

  render() {
    const ph = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg';

    return (
      <header>
        <div className="container">
          <div className="overlay">
          </div>
          <Menu/>
          <div className="content">
            <h2>Marvel heroes sit dolor comics amet.</h2>
            <div className="try-random">
              <a href="#randomize" onClick={this.props.randomPalette}>Try a random image</a>
            </div>
            <div className="images-container">
              <div className="bg-images">
                <div className={"img-left bg-img " + (this.props.loading ? "" : "appear")}>
                  <img id="bg-left" src={this.props.prev ? this.props.prev.imgURL : ph}
                                    alt={this.props.prev ? this.props.prev.heroName : ""} />
                </div>
                <div className={"img-right bg-img " + (this.props.loading ? "" : "appear")}>
                  <img id="bg-right" src={this.props.next ? this.props.next.imgURL : ph}
                                     alt={this.props.next ? this.props.next.heroName : ""} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;