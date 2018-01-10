import React, { Component } from 'react'
import contract from 'truffle-contract'
import SimpleStorageContract from '../build/contracts/SampleCrowdsale.json'
import GustavoCoin from '../build/contracts/GustavoCoin.json'
import getWeb3 from './utils/getWeb3'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  async componentWillMount() {
    let results = await getWeb3

    this.setState({ web3: results.web3 })
    this.instantiateContract()
  }

  async instantiateContract() {
    let { web3 } = this.state

    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(web3.currentProvider)

    const sampleCrowdsaleToken = contract(GustavoCoin)
    sampleCrowdsaleToken.setProvider(web3.currentProvider)

    web3.eth.getAccounts((error, accounts) => {
      let account1 = accounts[1]

      simpleStorage.deployed().then(async (instance) => {

        let tokenAddress = await instance.token()
        let sampleCrowdsaleTokenInstance = sampleCrowdsaleToken.at(tokenAddress)

        let balance = await sampleCrowdsaleTokenInstance.balanceOf(account1)

        let res = web3.fromWei(balance.toString(10), "ether")

        console.log("result ether by contract")
        console.log(res)
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <button onClick={this.handle}> button </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
