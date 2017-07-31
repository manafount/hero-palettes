import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Search, Header } from 'semantic-ui-react';
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
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.name });
    this.props.pickPalette(result.id);
  }

  render() {
    const { isLoading, value, results } = this.state;
    const resultRenderer = ({ name }) => <div>{name}</div>;

    return(
      <Menu secondary>
        <Menu.Item>
          <Header className='clickable' size='huge' onClick={this.handleGenerate}>
            HeroPalettes
          </Header>
        </Menu.Item>
        <Menu.Menu position='right'>
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
          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item><Icon name='download'/>Export</Dropdown.Item>
              <Dropdown.Item><Icon name='share'/>Share</Dropdown.Item>
              <Dropdown.Item><Icon name='info'/>Hero Info</Dropdown.Item>
              <Dropdown.Item><Icon name='github'/>Source</Dropdown.Item>
              <Dropdown.Item><Icon name='linkedin'/>Hire Me!</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default MainMenu;