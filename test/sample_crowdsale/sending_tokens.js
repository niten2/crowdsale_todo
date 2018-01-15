import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
import { duration, increaseTimeTo } from "../helpers/increaseTime"
import { advanceBlock } from '../helpers/advanceToBlock'
import latestTime from "../helpers/latestTime"
chai.use(chaiAsPromised)

let Crowdsale = artifacts.require("./SampleCrowdsale.sol")
let Token = artifacts.require("./SampleCrowdsaleToken.sol")
const BigNumber = web3.BigNumber

contract('SampleCrowdsale', () => {
  let wallet = web3.eth.accounts[0]
  let account = web3.eth.accounts[1]

  let startTime
  let endTime
  let afterWhitelistTime
  let afterEndTime
  let rate
  let goal
  let cap

  let crowdsale
  let tokens
  // let usedTokensSupply = new BigNumber(0);
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

    goal = web3.toWei(10, "ether")
    cap = web3.toWei(20, "ether")

    crowdsale = await Crowdsale.new(startTime, endTime, rate, goal, cap, wallet)

    // crowdsale = await Crowdsale.new(startTime, endTime, rate, wallet, wallet, bitClaveWallet);

    tokens = Token.at(await crowdsale.token.call())
    // bonusCoefficient = await crowdsale.BONUS_COEFF.call()
    // catToUsedPrice = await crowdsale.TOKEN_USDCENT_PRICE.call()
  })


  it(`should have zero balance investor`, async () => {
    let balance = (await tokens.balanceOf(account)).toString(10)

    expect(balance).to.eql("0")
  })

  it(`should add balance investor`, async () => {
    await crowdsale.sendTransaction({ from: account, value: web3.toWei(10, "ether")})

    let balance = (await tokens.balanceOf(account)).toString(10)

    expect(balance).to.eql("1000000000000000000000")
  })

  it(`should have valid totalSupply`, async () => {
    let crowdsale = await SampleCrowdsale.deployed()
    let coinInstance = SampleCrowdsaleToken.at(await crowdsale.token())

    // await crowdsale.sendTransaction({ from: account, value: web3.toWei(20, "ether")})

    let totalSupply = await web3.fromWei(await instance.totalSupply()).toString(10)

    expect(totalSupply).to.eql(2000)
  })

})
