import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Palette from './Palette';

class PaletteWrapper extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    let pals;
    const palette = this.props.palette;
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
          <div className="img-main" style={{opacity: "1", transform: "translateY(0%)"}}>
            <img id="bg-main" src="https://vignette3.wikia.nocookie.net/marveldatabase/images/5/5f/Amazing_Spider-Man_Vol_4_1.6_Textless.jpg/revision/latest/scale-to-width-down/328?cb=20160322173450"/>>
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