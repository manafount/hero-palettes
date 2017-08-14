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
    const rgb = this.props.bgColor;
    const yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000; // calculate 'luminosity' of bg color
    const textColor = (yiq >= 175 ? 'black' : 'white');

    return (
      <header>
        <div className="container" style={{background: 'rgb(' + this.props.bgColor.join(',') + ')'}}>
          <div className="overlay">
          </div>
          <Menu textColor={textColor}/>
          <div className="content" style={{color: textColor}}>
            <h2>Make your next design <i>Heroic</i></h2>
            <div className="try-random">
              <a href="#randomize" onClick={this.props.randomPalette}>Try a random image</a>
            </div>
            <div className="images-container">
              <div className="bg-images">
                <div className='left-button' onClick={this.props.loadPrev}>
                  <i className="fa fa-chevron-left"/>
                </div>
                <div className={"img-left bg-img " + (this.props.loading ? "" : "appear")}>
                  <img id="bg-left" src={this.props.prevChar ? this.props.prevChar.img : ph}
                                    alt={this.props.prevChar ? this.props.prevChar.heroName : ""} />
                </div>
                <div className={"img-right bg-img " + (this.props.loading ? "" : "appear")}>
                  <img id="bg-right" src={this.props.nextChar ? this.props.nextChar.img : ph}
                                     alt={this.props.nextChar ? this.props.nextChar.heroName : ""} />
                </div>
                <div className='right-button' onClick={this.props.loadNext}>
                  <i className="fa fa-chevron-right"/>
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