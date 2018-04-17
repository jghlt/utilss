import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object
  }

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {

    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate(){
    console.log(this.state.order);
    console.log('it updated');

    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    console.log('adding a fish');

    // copy existing state
    const fishes = { ...this.state.fishes };

    // add new fish to copy
    fishes[`fish${Date.now()}`] = fish;

    // update state
    this.setState({
      fishes: fishes
    });

  }

  updateFish = (key, updatedFish) => {
    console.log('updateFish');

    // copy current fish
    const fishes = { ...this.state.fishes };

    // update state
    fishes[key] = updatedFish;

    // set state
    this.setState({
      fishes: fishes
    })
  }

  deleteFish = (key) => {
    console.log('deleteFish');

    // copy current state
    const fishes = { ...this.state.fishes };

    // remove item state
    fishes[key] = null;

    // set state
    this.setState({
      fishes: fishes
    });

  }

  addToOrder = (key) => {

    console.log('adding to order');

    // copy setState
    const order = { ...this.state.order };

    // either add or update
    order[key] = order[key] + 1 || 1;

    // call setState to update order
    this.setState({
      order: order
    })

  }

  removeFromOrder = (key) => {
    console.log('removeFishFromOrder');
    console.log(key);

    // copy state
    const order = {
      ...this.state.order
    };

    // remove item
    order[key] = null;
    delete order[key];

    // set state
    this.setState({
      order: order
    });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {
              Object.keys(this.state.fishes).map(key => { return (
                <Fish
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.fishes[key]} />
              )}
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
};

export default App;
