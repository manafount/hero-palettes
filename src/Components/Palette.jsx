import React, { Component } from 'react';
import autoBind from 'react-autobind';
import ntc from 'ntc';
import Clipboard from 'clipboard';

import Checkmark from './Checkmark';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      checkmark: false,
      appearTimeout: null,
      copyTimeout: null
    };

    autoBind(this);
  }

  componentDidMount() {
    new Clipboard('.palette');
    this.animateEnter();
  }

  animateEnter() {
    this.setState({
      appearTimeout: setTimeout(() => {
        this.setState({loading: false});
      }, 100 * this.props.id)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rgb === this.props.rgb) {
      return;
    }else{
      clearTimeout(this.state.appearTimeout); 
      this.setState({loading: true});
      this.animateEnter();
    }
  }

  handleCopy(e) {
    this.setState({ checkmark: true });
    clearTimeout(this.state.copyTimeout);
    this.setState({
      copyTimeout: setTimeout(() => {
        this.setState({checkmark: false});
      }, 1500)
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.copyTimeout);
    clearTimeout(this.state.appearTimeout);   
  }

  render() {
    const rgb = this.props.rgb.map(i => Math.round(i)); // avoid rounding errors from palette generation
    const yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000; // calculate 'luminosity' of bg color
    const textColor = (yiq >= 175 ? 'black' : 'white');
    //Name That Color requires a hex code as input, so we convert from rgb to hex here
    const hex = rgb.map((val) => {
      return ("0" + parseInt(val,10).toString(16)).slice(-2);
    }).join('');
    const colorName = ntc.name(hex)[1]; // => [ rgb value, color name, exact match?]
    const styles = {
      svgStyles: {
        stroke: textColor
      },
      circleStyles: {
        stroke: textColor
      }
    };

    return(
      <div className={'palette ' + (this.state.loading ? '' : 'palette-appear')}
           data-clipboard-text={'#' + hex}
           onClick={this.handleCopy}>
        <div className="color-sq" id={"sq-" + this.props.id} style={{ backgroundColor: `rgb(${this.props.rgb})` }}>
          <div className="copied" id={"copied-" + this.props.id} style={{ color: "black" }}>
            <span className="icon canva-icon-tick" aria-hidden="true"></span>
          </div>
          <div className="copy" id={"copy-" + this.props.id} 
                                style={{color: textColor}}>
            {this.state.checkmark ? <Checkmark styles={styles}/> : <span>Copy</span> }
          </div>
        </div>
        <div className="color-name">{colorName}</div>
        <div className="color-hex" id={"color-hex-" + this.props.id}>{'#' + hex}</div>
      </div>
    );
  }
}

export default Palette;