import React from 'react';
import './App.css';

class ShopItem extends React.Component {
  // Todo: As with everything else, upgrade to a general solution!
  render() {
    return (
      <td className="shop-item">

        <p>Amaranth Seed</p>
        <p>Cost: ${this.props.cost}</p>
        <button className="game-btn-buySeed" onClick={this.props.buySeed}>Purchase</button>
      </td>
    );
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

class App extends React.Component {
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
        seeds: 0,
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
      <div className="App">
        <header className="App-header">
          <p>Plantorio</p>
        </header>
        <div className="game">
          <div className="game-notifications">
            <p>Seeds: {this.state.player.seeds}</p>
            TODO (Warnings about wilting/rotting plants and the like)
          </div>
          <br/>
          <div className="game-shop">
            <p>Funds: $ {this.state.player.money}</p>
            <table className="game-shop-goods">
              <tr>
                Seeds:
                <ShopItem key="BuyAmaranthSeed" cost={25} buySeed={this.purchaseItem}/>
              </tr>
            </table>
          </div>
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
          <div className="game-footer">
            <p>Day: {this.state.worldTick + 1}</p>
            <button
              className="game-btn-nextDay"
              onClick={this.advanceDay}>
                Next Day
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
