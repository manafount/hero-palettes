import React, { Component } from 'react';
import autoBind from 'react-autobind';

import MainImage from './MainImage';
import Palette from './Palette';
import PieChart from './Pie';

class PaletteWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      mainImg: null,
      loading: false,
      appear: false,
      tab: 'swatches'
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({mainImg: nextProps.character.img});
  }

  handleSwatchTab(e) {
    e.preventDefault();
    this.setState({tab: "swatches"});
  }
  
  handleGraphTab(e) {
    e.preventDefault();
    this.setState({tab: "graph"});
  }

  renderSwatches() {
    let swatches;
    let palette = this.props.character.palette;
    if(palette) {
      swatches = Object.keys(palette).map((color, index) => {
      return <Palette key={'palette' + index}
                      id={index}
                      color={color}
                      rgb={palette[color] ? palette[color]._rgb 
                      : [255, 255, 255]}/>;
      });
    }
    return swatches;
  }

  renderGraph() {
    let slices = {};
    let palette = this.props.character.palette;
    if(palette) {
      slices = Object.keys(palette).map((color, index) => {
        if (palette[color] && palette[color]._population > 0) {
          return { color: `rgb(${palette[color]._rgb.join(',')})`,
                   value: Math.round(Math.log(palette[color]._population))
                 };
        }else{
          return { color: "#fff", value: 0 };
        }
      });
    }

    return <PieChart slices={slices}/>;
  }

  render() {
    const currentTab = this.state.tab;
    return (
      <section className="palette-body">
        <div className="main-content">
          <div className={"img-main " + (this.props.loading ? "appear" : "appear")}>
            <MainImage src={this.state.mainImg} 
                       heroName={this.props.character.heroName} 
                       loading={this.props.loading} 
                       animateAppear={this.props.animateAppear}/>
          </div>
        </div>

        <ul className="tabs">
          <li className={"swatches-tab " + (currentTab === "swatches" ? "selected" : "")}
              onClick={this.handleSwatchTab}>
            Swatches
          </li>
          <li className={"graph-tab " + (currentTab === "graph" ? "selected" : "")}
              onClick={this.handleGraphTab}>
            Graph
          </li>
        </ul>
        {(currentTab === "swatches" ?
          <div className="palette-wrapper">
            {this.renderSwatches()}
          </div>
        :
          <div className="graph-container">
            {this.renderGraph()}
          </div>
        )}
      </section>
    );
  }
}

export default PaletteWrapper;