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

  loadRandomPalette() {
    this.setState({loading: true});
    let animateLoading = setTimeout(() => {
      this.props.randomPalette();
      this.setState({loading: false});
    }, 300);
  }


  render() {
    return (
      <header>
        <div className="container">
          <div className="overlay">
          </div>
          <Menu/>
          <div className="content">
            <h2>Marvel heroes sit dolor comics amet.</h2>
            <div className="try-random">
              <a href="#randomize" onClick={this.loadRandomPalette}>Try a random image</a>
            </div>
            <div className="images-container">
              <div className="bg-images">
                <div className={"img-left bg-img " + (this.state.loading ? "" : "appear")}>
                  <img id="bg-left" src="https://vignette2.wikia.nocookie.net/marveldatabase/images/e/e6/Doctor_Strange_Vol_4_20_Mora_Variant_Textless.jpg/revision/latest/scale-to-width-down/329?cb=20170221235214"/>>
                </div>
                <div className={"img-right bg-img " + (this.state.loading ? "" : "appear")}>
                  <img id="bg-right" src="https://vignette2.wikia.nocookie.net/marveldatabase/images/c/cb/Invincible_Iron_Man_Vol_2_2_Textless.jpg/revision/latest/scale-to-width-down/328?cb=20150926012422"/>>
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