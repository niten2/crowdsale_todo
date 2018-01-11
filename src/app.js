import React, { Component } from 'react'
import Balance from 'src/components/balance'
import Address from 'src/components/address'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Balance />
        <Address />
      </div>
    )
  }
}

export default App
