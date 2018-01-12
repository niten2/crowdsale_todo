import React, { Component } from 'react'
import Balance from 'src/components/balance'
import Address from 'src/components/address'
import Actions from 'src/components/actions'
import Info from 'src/components/info'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Balance />
        <Address />
        <Actions />
        <Info />
      </div>
    )
  }
}

export default App
