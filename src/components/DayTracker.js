import React from 'react';

class DayTracker extends React.Component {
  render() {
    return (
      <div className="game-footer">
        <p>Day: {this.props.day + 1}</p>
        <button
          className="game-btn-nextDay"
          onClick={this.props.advanceDay}>
            Next Day
        </button>
      </div>
    )
  }
}

export default DayTracker;
