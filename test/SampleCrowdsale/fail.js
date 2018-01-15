import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
import chaiBignumber from "chai-bignumber"
import latestTime from "test/helpers/latestTime"
import ether from 'test/helpers/ether'
import EVMRevert from 'test/helpers/EVMRevert'
import { duration, increaseTimeTo } from "test/helpers/increaseTime"
import { advanceBlock } from 'test/helpers/advanceToBlock'

chai.use(chaiAsPromised)
chai.use(chaiBignumber(web3.BigNumber))

let Crowdsale = artifacts.require("./SampleCrowdsale.sol")
let Token = artifacts.require("./SampleCrowdsaleToken.sol")
const BigNumber = web3.BigNumber

contract('Crowdsale: ', function ([_, wallet, walletInvestorFirst, walletInvestorSecond, walletMetaMask]) {
  let startTime
  let endTime
  let afterWhitelistTime
  let afterEndTime
  let rate
  let goal
  let cap

  let crowdsale
  let tokens
  let usedTokensSupply = new BigNumber(0);

  before(async function () {
    // Advance to the next block to correctly read time in
    // the solidity "now" function interpreted by testrpc
    await advanceBlock()

    const initialTime = latestTime()
    const diff = 0 // new Date("2017-10-25").getTime() - initialTime

    await increaseTimeTo(initialTime + diff)

    startTime = latestTime() + duration.weeks(1)
    endTime = startTime + duration.days(7)
    afterWhitelistTime = startTime + duration.hours(4)
    afterEndTime = endTime + duration.seconds(1)

    rate = new BigNumber(100)
    goal = ether(10)
    cap = ether(20)

    crowdsale = await Crowdsale.deployed()
    tokens = Token.at(await crowdsale.token.call())
  })

  it(`should buyTokens walletInvestorFirst`, async () => {
    await buyTokens(walletInvestorFirst, { from: walletInvestorFirst, value: ether(1) })
  })

  it(`should not has ended`, async () => {
    expect(await crowdsale.hasEnded()).to.be.false
  })

  it(`should have state Active`, async () => {
    expect(await getState()).to.eql("Active")
  })

  it(`should set end time crowdsale`, async () => {
    await increaseTimeTo(afterWhitelistTime + duration.days(8))

    let timestamp = web3.eth.getBlock(web3.eth.blockNumber).timestamp

    expect(timestamp).to.eql(afterWhitelistTime + duration.days(8))
  })

  it(`should have hasEnded true`, async () => {
    expect(await crowdsale.hasEnded()).to.be.true
  })

  it(`should have state Refunding`, async () => {
    await crowdsale.enableRefunds()

    expect(await getState()).to.eql("Refunding")
  })







  // NOTE helpers

  let buyTokens = async (wallet, params) => {
    let result

    if (params.from === wallet || !params.from) {
      params.from = wallet
      const { logs } = await crowdsale.sendTransaction(params)
      result = logs
    } else {
      const { logs } = await crowdsale.buyTokens(wallet, params)
      result = logs
    }

    const event = result.find(e => e.event === 'TokenPurchase')

    expect(event).to.exist
    expect(event.args.purchaser).to.equal(params.from)
    expect(event.args.beneficiary).to.equal(wallet)
    expect(event.args.value).to.be.bignumber.equal(params.value)

    usedTokensSupply = usedTokensSupply.add(event.args.amount)

    return event.args.amount
  }

  let validateBalance = async (wallet, amount) => {
    let balance = await getBalance(wallet)
    expect(balance).to.be.bignumber.equal(amount)
    return balance
  }

  let getBalance = async (wallet) => {
    return await tokens.balanceOf(wallet)
  }

  let getState = async () => {
    let state = (await crowdsale.state()).toString(10)

    const status = {
      0: "Active",
      1: "Refunding",
      2: "Closed",
    }

    return status[state]
  }

})
