import React from 'react';
import './App.css';

class Plant extends React.Component {
  // <p>DEBUG: {this.props.rowIndex},{this.props.colIndex}</p>
  render() {
    return (
      <td className="game-plant">
        <p>{this.props.name}</p>
        <p>Needs: {this.props.status.waterToday} / {this.props.dailyNeeds.water} 🚰</p>
        <p>Status: {this.props.status.description}</p>
        <button className="game-btn-waterPlant" onClick={this.props.onClick}>Water 🚰</button>
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
        status: {
          description: "Healthy",
          age: 0,
          waterToday: 0,
        },
        dailyNeeds: {
          water: 1,
        },
        daysToGrow: 2,
      }))),
      worldTick: 0,
      player: {
        money: 100,
      },
    }
  }

  waterPlant = (row, col, plant) => {
    const previousWater = plant.status.waterToday;
    const newGrid = [...this.state.worldGrid];
    newGrid[row][col] = {...plant};
    newGrid[row][col].status.waterToday = previousWater + 1;

    this.setState({
      worldGrid: newGrid
    });
  }

  advanceDay = () => {
    const previousDay = this.state.worldTick;
    const newGrid = [...this.state.worldGrid];

    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        Object.entries(cell.dailyNeeds).forEach((need) => {
          if (cell.status.waterToday !== need[1]) {
            cell.status.description = "Wilted";
          }
        });
      });
    });


    this.setState({
      worldGrid: newGrid,
      worldTick: previousDay + 1,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Plantorio</p>
        </header>
        <div className="game">
          <div className="game-notifications">
            TODO (Warnings about wilting/rotting plants and the like)
          </div>
          <br/>
          <div className="game-shop">
            <p>Funds: $ {this.state.player.money}</p>
            TODO (Where you'll buy new seeds, machines, and greenhouse expansions)
          </div>
          <br/>
          <div className="game-world-grid">
            <table>
              {this.state.worldGrid.map((row, rowIndex) => <tr key={rowIndex}> {
                row.map((cell, colIndex) => <Plant {...cell}
                  onClick={() => this.waterPlant(rowIndex, colIndex, cell)}
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
