import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';
import SwapiService from '../../services/swapi-service';

import './ship-details.css';

export default class ShipDetails extends Component {

  swapiService = new SwapiService();

  state = {
    starship: {}
  };

  componentDidMount() {
    this.updateStarship();
  }

  componentDidUpdate(prevProps) {
    if (this.props.starshipid !== prevProps.starshipid) {
      this.updateStarship();
    }
  }

  updateStarship() {
    const { starshipid } = this.props;
    if (!starshipid) {
      return;
    }

    this.swapiService
      .getStarship(starshipid)
      .then((starship) => {
        this.setState({ starship });
      });
  }

  render() {

    const { starship } = this.state;
    if (!starship) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, model,
        manufacturer, costInCredits, length,
        crew, passengers, cargoCapacity } = starship;

    return (
      <div className="person-details card">
        <img className="starship-image"
          src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
          alt="starships"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Model</span>
              <span>{model}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Manufacturer</span>
              <span>{manufacturer}</span>
            </li>
            <li className="list-group-item">
              <span className="term">CostInCredits</span>
              <span>{costInCredits}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Length</span>
              <span>{length}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Crew</span>
              <span>{crew}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Passengers</span>
              <span>{passengers}</span>
            </li>
            <li className="list-group-item">
              <span className="term">CargoCapacity</span>
              <span>{cargoCapacity}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}