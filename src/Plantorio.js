import React from 'react';
import './Plantorio.css';

import DayTracker from './components/DayTracker';
import Notifications from './components/Notifications';
import Inventory from './components/Inventory';

class EmptyTile extends React.Component {
  render() {
    return (
      <td className="game-empty-tile">
        <button className="game-btn-plantSeed" onClick={this.props.plantSeed}>
          Plant Seed
        </button>
      </td>
    )
  }
}

class Plant extends React.Component {
  render() {
    return (
      <td className="game-plant">
        <p>{this.props.name}</p>
        <p>Needs: {this.props.resources.water} / {this.props.needs.water} 🚰</p>
        <p>Status: {this.props.description}</p>
        <button className="game-btn-waterPlant" onClick={this.props.waterPlant}>Water 🚰</button>
        <button
          className="game-btn-harvestPlant"
          disabled={!this.props.status.hasGrown}
          onClick={this.props.harvestPlant}>
            Harvest ☭
        </button>
      </td>
    );
  }
}

class Plantorio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      worldGrid: Array(2).fill(0).map(row => new Array(3).fill(0).map(cell => ({
        name: "Amaranth",
        description: "Healthy",
        status: {
          age: 0,
          hasGrown: false,
          hasWilted: false,
          hasRot: false,
          harvested: false,
        },
        daysToGrow: 1,
        // Needs are per day
        needs: {
          water: 1,
        },
        resources: {
          water: 0,
        },
      }))),
      worldTick: 0,
      player: {
        money: 1000,
        inventory: {
          SEEDS: {
            AMARANTH: 0,
            BEET: 0
          },
          MACHINES: {
            SPRINKLER_MK_1: 0
          }
        }
      },
    }
  }

  waterPlant = (row, col, plant) => {
    const previousWater = plant.resources.water;
    const newGrid = [...this.state.worldGrid];
    newGrid[row][col] = {...plant};
    newGrid[row][col].resources.water = previousWater + 1;

    this.setState({
      worldGrid: newGrid
    });
  }

  harvestPlant = (row, col, plant) => {
    const newMoney = this.state.player.money + 50;
    const newGrid = [...this.state.worldGrid];
    newGrid[row][col] = {...plant};

    // TODO grid manip
    newGrid[row][col].name = "Empty Planter";
    newGrid[row][col].description = "Harvested";
    newGrid[row][col].status.harvested = true;

    this.setState({
      worldGrid: newGrid,
      player: {...this.state.player, money: newMoney},
    });
  }

  advanceDay = () => {
    const previousDay = this.state.worldTick;
    const newGrid = [...this.state.worldGrid];

    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        Object.entries(cell.resources).forEach((resource, i) => {
          if(resource[0] === "water" && !cell.status.hasRot) {
            if (resource[1] !== cell.needs.water) {
              if (cell.status.hasWilted) {
                cell.description = "Rotten";
                cell.status.hasRot = true;
                cell.status.hasWilted = false;
              } else {
                cell.description = "Wilted";
                cell.status.hasWilted = true;
              }
            } else {
              cell.description = "Healthy";
            }
          }
        });

        if((cell.status.age === cell.daysToGrow) && !cell.status.hasRot) {
          cell.description = "Grown";
          cell.status.hasGrown = true;
          cell.status.hasWilted = false;
        }

        Object.entries(cell.resources).forEach((resource, i) => {
          cell.resources[resource[0]] = 0;
        });
        cell.status.age = cell.status.age + 1;
      });
    });

    this.setState({
      worldGrid: newGrid,
      worldTick: previousDay + 1,
    })
  }

  purchaseItem = () => {
    const newMoney = this.state.player.money - 25;
    const newSeed = this.state.player.seeds + 1;
    this.setState({
      player: {...this.state.player, money: newMoney, seeds: newSeed},
    });
  }

  render() {
    return (
      <div className="Plantorio">
        <header className="Plantorio-header">
          <p>Plantorio</p>
        </header>
        <div className="game">
          <Notifications />
          <Inventory
            player={this.state.player}
          />
          <br/>
          <div className="game-world-grid">
            <table>
              {this.state.worldGrid.map((row, rowIndex) => <tr key={rowIndex}> {
                row.map((cell, colIndex) => <Plant {...cell}
                  waterPlant={() => this.waterPlant(rowIndex, colIndex, cell)}
                  harvestPlant={() => this.harvestPlant(rowIndex, colIndex, cell)}
                  key={colIndex}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />)
              } </tr>)}
            </table>
          </div>
          <br/>
          <DayTracker day={this.state.worldTick} advanceDay={this.advanceDay}/>
        </div>
      </div>
    )
  }
}

export default Plantorio;
