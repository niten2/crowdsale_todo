import React, { Component } from 'react'
import Balance from 'src/components/balance'
import Address from 'src/components/address'
import Actions from 'src/components/actions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Balance />
        <Address />
        <Actions />
      </div>
    )
  }
}

export default App
