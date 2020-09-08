import React from 'react';

import Item from './Item';

import { ITEM_CATALOGUE } from '../constants';

/*
<tr>
  Seeds:
  <Item key="BuyAmaranthSeed" cost={25} buySeed={this.purchaseItem}/>
</tr>
*/

class Inventory extends React.Component {
  render() {
    return (
      <div className="game-inventory">
        <p>Funds: $ {this.props.player.money}</p>
        <table className="game-inventory-catalogue">
          {Object.keys(ITEM_CATALOGUE).map(category_key => (
            <tr className="game-inventory-category" key={category_key}>
              <p>{category_key}</p>
              {Object.keys(ITEM_CATALOGUE[category_key]).map(item_key => (
                <Item
                  item={ITEM_CATALOGUE[category_key][item_key]}
                  owned={"todo"}
                />
              ))}
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default Inventory;
