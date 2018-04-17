import React from 'react';
import PropTypes from 'prop-types';
import Masthead from './Masthead';

class App extends React.Component {

  static propTypes = {
  };

  state = {
    loading: true
  };

  componentDidMount() {
    console.log('App: componentDidMount')
    this.setState({
      loading: false
    })
  };

  componentDidUpdate(){
    console.log('App: componentDidUpdate')
  };

  render(){
    return (
      <div>
        <Masthead/>
        <div id="app">
          <h1>App</h1>
        </div>
      </div>
    )
  };
};

export default App;
