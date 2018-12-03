import React, {Component} from 'react'
import {render} from 'react-dom'

import GoProblem from '../../src'

/*
<data>
  <name>50K-1</name>
  <size>9</size>
  <init>B[de]W[ee]B[ed]B[ef]</init>
  <sequence>
      <play pos="fe" message="success@red">
      </play>
      <play pos="zz" res="fe" message="failed@blue">
      </play>
  </sequence>
</data>
*/

class Demo extends Component {
  render() {
    return <div>
      <h1>9x Problem</h1>
      <GoProblem
        size={9}
      />
      <h1>Demo 19x</h1>
      <GoProblem/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
