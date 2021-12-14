import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ShipDetails from '../ship-details/ship-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './starship-page.css';

export default class StarshipPage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedStarship: 3
  };

  onShipSelected = (selectedStarship) => {
    this.setState({ selectedStarship });
  };

  render() {

    const itemList = (
      <ItemList
        onItemSelected={this.onShipSelected}
        getData={this.swapiService.getAllStarships}>

        {(i) => (
          `${i.name} (${i.model})`
        )}

      </ItemList>
    );

    const shipDetails = (
      <ErrorBoundry>
        <ShipDetails starshipId={this.state.selectedStarship} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={shipDetails} />
    );
  }
}
