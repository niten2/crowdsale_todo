import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
import chaiBignumber from "chai-bignumber"
import { duration, increaseTimeTo } from "./helpers/increaseTime"
import { advanceBlock } from './helpers/advanceToBlock'
import latestTime from "./helpers/latestTime"
import ether from './helpers/ether'
import EVMRevert from './helpers/EVMRevert'

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

  // let residueTokens = new BigNumber(0);
  // let bonusCoefficient = new BigNumber(0);
  // let catToUsedPrice = new BigNumber(0);

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

    // crowdsale = await Crowdsale.new(startTime, endTime, rate, goal, cap, wallet)
    crowdsale = await Crowdsale.deployed()
    tokens = Token.at(await crowdsale.token.call())
    // bonusCoefficient = await crowdsale.BONUS_COEFF.call()
    // catToUsedPrice = await crowdsale.TOKEN_USDCENT_PRICE.call()
  })

  it(`should have zero balance walletInvestorFirst`, async () => {
    await validateBalance(walletInvestorFirst, new BigNumber(0))
  })

  it(`should buyTokens walletInvestorFirst`, async () => {
    await buyTokens(walletInvestorFirst, { from: walletInvestorFirst, value: ether(1) })
  })

  it(`should have valid balance walletInvestorFirst`, async () => {
    await validateBalance(walletInvestorFirst, new BigNumber(100000000000000000000))
  })

  it(`should have valid balance walletInvestorFirst`, async () => {
    await validateBalance(walletInvestorFirst, new BigNumber(100000000000000000000))
  })

  it(`should have status Active`, async () => {
    let res = await getStatus()

    expect(res).to.eql("Active")
  })




  // it(`should have valid totalSupply`, async () => {

  //   let totalSupply = await web3.fromWei(await instance.totalSupply()).toString(10)

  //   expect(totalSupply).to.eql(1000)
  // })


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

  let getStatus = async () => {
    let state = (await crowdsale.state()).toString(10)

    const status = {
      0: "Active",
      1: "Refunding",
      2: "Closed",
    }

    return status[state]
  }

})
