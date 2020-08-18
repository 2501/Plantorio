import React from 'react';
import './App.css';

class WorldCell extends React.Component {
  render() {
    return (
      <td
        className="world-cell"
        onClick={() => this.props.onClick(r,c)}
      >
        {this.props.content.name}: {this.props.content.status}
      </td>
    )
  }
}

class WorldGrid extends React.Component {
  renderSquare(r,c) {
    return (
      <WorldCell
        content={{name: "Amaranth", status: "Healthy"}}
        onClick={() => this.props.onClick(r,c)}
      />
    );
  }

  render() {
    return (
      <table>
        {this.state.worldGrid.map(row => <tr key={row}> {
          row.map(cell => <WorldCell content={{name: "Amaranth", status: "Healthy"}} onClick={() => this.props.onClick(r,c)} key={cell}/>)
        } </tr>)}
      </table>
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
                row.map(cell => <td key={cell}> cell! </td>)
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
