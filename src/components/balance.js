import React, { Component } from 'react'
import contract from 'truffle-contract'
import SampleStorageContract from '../build/contracts/SampleCrowdsale.json'
import SampleCrowdsaleToken from '../build/contracts/SampleCrowdsaleToken.json'
import getWeb3 from './utils/getWeb3'

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

  async handle() {
    let { sampleStorageContract, sampleCrowdsaleToken, web3 } = this.state

    // let tokenAddress = await contract.token()

    // let instanceToken = await token.at(tokenAddress)

    // console.log(instanceToken)
    // instanceToken.balanceOf

    // let instanceToken = await contract.deployed()



    // await Promise.new((resolve, reject) => {

      // web3.eth.getAccounts(async (error, accounts) => {
      //   let account1 = accounts[1]


          // let tokenAddress = await instance.token()
          // let sampleCrowdsaleTokenInstance = sampleCrowdsaleToken.at(tokenAddress)
          // let balance = await sampleCrowdsaleTokenInstance.balanceOf(account1)
          // let res = web3.fromWei(balance.toString(10), "ether")

          // console.log("result ether by contract")
          // console.log(res)
        // })
      // })


    })
  }

  render() {
    let { balance } = this.state

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your balance contract { balance || "not found" }</h1>
              <button onClick={this.handle}> refresh </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
