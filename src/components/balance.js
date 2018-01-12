import React, { Component } from 'react'
import { getWeb3, getSampleCrowdsale, getSampleCrowdsaleToken } from 'src/utils/params'

export default class Balance extends Component {

  state = {
    balance: null,
    accounts: [],
  }

  async componentWillMount() {
    await this.handle()
  }

  handle = async () => {
    this.setState({ balance: "processing...", accounts: [] })

    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)

    let token = await getSampleCrowdsaleToken(web3)
    let instance = await token.at(await crowdsale.token())

    let addressList = await web3.eth.accounts

    let accounts = []

    await Promise.all(
      addressList.map(async (address, index) => {
        let balance = web3.fromWei((await web3.eth.getBalance(address)).toString(10))
        let tokens = web3.fromWei((await instance.balanceOf(address)).toString(10))

        accounts.push({
          index,
          balance,
          tokens,
          address
        })
      })
    )

    this.setState({ accounts })
  }

  render() {
    let { accounts } = this.state

    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td> index </td>
              <td> address </td>
              <td> balance </td>
              <td> tokens </td>
            </tr>

            { accounts.length === 0 ? <tr><td> processing... </td></tr> : null }

            {
              accounts.map((account, key) =>
                <tr key={key}>
                  <td> { account.index } </td>
                  <td> { account.address } </td>
                  <td> { account.balance } </td>
                  <td> { account.tokens } </td>
                </tr>
              )
            }
          </tbody>
        </table>

        <button onClick={ this.handle }> refresh </button>
      </div>
    )
  }
}
