import React, { Component } from 'react'
import contract from 'truffle-contract'
import SampleStorageContract from 'build/contracts/SampleCrowdsale.json'
import SampleCrowdsaleToken from 'build/contracts/SampleCrowdsaleToken.json'
import getWeb3 from 'src/utils/getWeb3'

export default class Balance extends Component {

  state = {
    balance: null,
    web3: null,
    sampleStorageContract: null,
    sampleCrowdsaleToken: null,
  }

  async componentWillMount() {
    let web3 = await getWeb3

    const sampleStorageContract = contract(SampleStorageContract)
    sampleStorageContract.setProvider(web3.currentProvider)

    const sampleCrowdsaleToken = contract(SampleCrowdsaleToken)
    sampleCrowdsaleToken.setProvider(web3.currentProvider)

    this.setState({ web3, sampleStorageContract, sampleCrowdsaleToken })
  }

  handle = async () => {
    let { sampleStorageContract, sampleCrowdsaleToken, web3 } = this.state

    let account1 = web3.eth.accounts[1]

    let instanceSampleStorageContract = await sampleStorageContract.deployed()
    let tokenAddress = await instanceSampleStorageContract.token()
    let instanceSampleCrowdsaleToken = await sampleCrowdsaleToken.at(tokenAddress)

    let balance = (await instanceSampleCrowdsaleToken.balanceOf(account1)).toString(10)

    console.log(balance)

    this.setState({ balance })

  }

  render() {
    let { balance } = this.state

    return (
      <div className="App">
        <h1>Your balance account1 { balance || "not found" }</h1>
        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
