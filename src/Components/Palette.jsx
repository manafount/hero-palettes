import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ntc from 'ntc';
import Clipboard from 'clipboard';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorName: '',
      colorHex: null,
      textColor: 'black',
      loading: false,
      copied: false
    };

    autoBind(this);
  }

  componentDidMount() {
    new Clipboard('.copy');
  }

  componentWillReceiveProps(nextProps) {
    const rgb = nextProps.rgb.map(i => Math.round(i)); // avoid rounding errors from palette generation
    const yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000; // calculate 'luminosity' of bg color
    const nextColor = (yiq >= 128 ? 'black' : 'white');
    //Name That Color requires a hex code as input, so we convert from rgb to hex here
    const hex = rgb.map((val) => {
      return ("0" + parseInt(val,10).toString(16)).slice(-2);
    }).join('');
    const ntcMatch = ntc.name(hex); // => [ rgb value, color name, exact match?]
    this.setState({ textColor: nextColor,
                    colorHex: hex,
                    colorName: ntcMatch[1]
                  });
  }

  render() {
    return(
      <div className="palette palette-loaded" data-clipboard-action="copy" data-clipboard-target={"#color-" + this.props.id}>
        <div className="color-sq" id={"sq-" + this.props.id} style={{ backgroundColor: `rgb(${this.props.rgb})` }}>
          <div className="copied" id={"copied-" + this.props.id} style={{ color: "black" }}>
            <span className="icon canva-icon-tick" aria-hidden="true"></span>
          </div>
          <div className="copy" id={"copy-" + this.props.id} 
                                style={{color: this.state.textColor}} 
                                data-clipboard-text={'#' + this.state.colorHex}>
            <span>Copy</span>
          </div>
        </div>
        <div className="color-name">{this.state.colorName}</div>
        <div className="color-hex" id={"color-hex-" + this.props.id}>{'#' + this.state.colorHex}</div>
      </div>
    );
  }
}

export default Palette;