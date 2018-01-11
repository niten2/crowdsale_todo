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
    this.setState({ balance: "processing..." })

    let web3 = getWeb3()
    let crowdsale = await getSampleCrowdsale(web3)

    let token = await getSampleCrowdsaleToken(web3)
    let instance = await token.at(await crowdsale.token())

    let accountsList = await web3.eth.accounts
    let accounts = []

    await Promise.all(
      accountsList.map(async (account, index) => {
        let balance = (await instance.balanceOf(account)).toString(10)

        accounts.push({
          index: index,
          balance,
          address: account,
        })
      })
    )

    this.setState({ accounts: accounts })
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
            </tr>

            { accounts.length === 0 ? <tr><td> processing... </td></tr> : null }

            {
              accounts.map((account, key) =>
                <tr key={key}>
                  <td> { account.index } </td>
                  <td> { account.address } </td>
                  <td> { account.balance } </td>
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
