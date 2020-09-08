import React from 'react';

class Item extends React.Component {
  render() {
    return (
      <td className="inventory-item">
        <p>{this.props.item.name}</p>
        <p>{this.props.item.description}</p>
        <p>Cost: ${this.props.item.cost}</p>
        <p>Owned: {this.props.owned}</p>
        <button className="game-btn-buySeed" onClick={this.props.buySeed}>Buy</button>
        <button className="game-btn-sellSeed" onClick={this.props.sellSeed}>Sell</button>
      </td>
    );
  }
}

export default Item;
