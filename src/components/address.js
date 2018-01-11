import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Balance extends Component {

  state = {
    address: null,
    token: null,
  }

  async componentWillMount() {
    await this.handle()
  }

  handle = async () => {
    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)

    let address = await crowdsale.address
    let token = await crowdsale.token()
    this.setState({ address, token })
  }

  render() {
    let { address, token } = this.state

    return (
      <div className="App">
        <h4>Address contract = { address || "not found" }</h4>
        <h4>Address token = { token || "not found" }</h4>
        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
