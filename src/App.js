import React from 'react';
import './App.css';

class Plant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Amaranth",
      status: "Healthy",
      waterPerDay: 1,
      daysToGrow: 2,
    }
  }

  render() {
    return (
      <td className="game-plant">
        <p>{this.state.name}</p>
        <p>Status: {this.state.status}</p>
      </td>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      worldGrid: Array(2).fill(0).map(row => new Array(3).fill(null)),
      worldTick: 0,
      player: {
        money: 100,
      },
    }
  }

  // <td key={cell}> cell! </td>
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
            TODO (Where you'll buy new seeds, machines, and greenhouse expansions)
          </div>
          <br/>
          <div className="game-world-grid">
            <table>
              {this.state.worldGrid.map(row => <tr key={row}> {
                row.map(cell => <Plant/>)
              } </tr>)}
            </table>
          </div>
          <br/>
          <div className="game-footer">
            TODO (Advance day button)
          </div>
        </div>
      </div>
    )
  }
}

export default App;
