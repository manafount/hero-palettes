import React, { Component } from 'react';
import { Icon, Menu, Grid, Dropdown, Search } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      results: []
    };
    autoBind(this);
  }

  handleGenerate(e) {
    e.preventDefault();
    this.props.pickRandomPalette();
  }

  
  handleSearchChange(e) {
    this.setState({isLoading: true, value: e.target.value});
    setTimeout(() => {
      let res = this.props.snapshotSearch(this.state.value).slice(0,3)
      .map((item) => ({id: item.id, name: item.name, image: item.url}));
      this.setState({
        isLoading: false,
        results: res
      });
    }, 300);
    console.log(this.state.results);
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.name });
    this.props.pickPalette(result.id);
  }

  render() {
    const { isLoading, value, results } = this.state;
    const resultRenderer = ({ name }) => <div>{name}</div>;

    return(
      <Grid.Row>
        <Menu fluid stackable size='huge' attached='top' borderless>
          <Menu.Item header>HeroPalettes</Menu.Item>
          <Menu.Item>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              resultRenderer={resultRenderer}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
            />
          </Menu.Item>
          <Menu.Item name='generate' onClick={this.handleGenerate}>
            Random
          </Menu.Item>
          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Share</Dropdown.Item>
              <Dropdown.Item>Hero Info</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item header position='right'><Icon name='github'/></Menu.Item>
          <Menu.Item header><Icon name='linkedin'/></Menu.Item>
        </Menu>
      </Grid.Row>
    );
  }
}

export default MainMenu;