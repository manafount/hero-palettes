import React, { Component } from 'react';
import autoBind from 'react-autobind';

import MainImage from './MainImage';
import Palette from './Palette';

class PaletteWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      mainImg: null,
      loading: false,
      appear: false
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({mainImg: nextProps.character.imgURL});
  }

  render() {
    let pals;
    const palette = this.props.character.palette;
    if(palette) {
      pals = Object.keys(palette).map((color, index) => {
        return <Palette key={index}
                        id={index}
                        color={color} 
                        rgb={palette[color] ? palette[color]._rgb 
                        : [255, 255, 255]}/>;
      });
    }

    return (
      <section className="palette-body">
        <div className="main-content">
          <div className={"img-main " + (this.props.loading ? "appear" : "appear")}>
            <MainImage src={this.state.mainImg} 
                       heroName={this.props.character.heroName} 
                       loading={this.props.loading} 
                       animateAppear={this.props.animateAppear}/>>
          </div>
        </div>

        <div className="palette-wrapper">
          {pals}
        </div>
      </section>
    );
  }
}

export default PaletteWrapper;