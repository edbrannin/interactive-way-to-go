import React, {Component} from 'react'
import { Goban } from 'react-goban'

const aaToA1 = (coords) => {}

const getStones = (stoneString) => {
  return 0
}

class GoProblem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stones: {},
      nextToPlay: this.props.nextToPlay || 'black'
    }
  }

  onIntersectionClick = (event) => {
    console.log('Clicked intersection', event);
  }

  render() {
    console.log('State:', this.state)
    console.log('Goban:', Goban)
    return <div>
      <Goban
        size={this.props.size}
        coordSystem="aa"
        stones={this.state.stones || {}}
        onIntersectionClick={this.onIntersectionClick}
        nextToPlay={this.state.nextToPlay}
      />
    </div>
  }
}

export default GoProblem