import settings from './settings'
import Web3 from 'web3'
import contract from 'truffle-contract'
import SampleCrowdsale from 'build/contracts/SampleCrowdsale.json'
import SampleCrowdsaleToken from 'build/contracts/SampleCrowdsaleToken.json'

export let getWeb3 = () => {
  let provider = new Web3.providers.HttpProvider(settings.web3Url)

  return new Web3(provider)
}

export let getSampleCrowdsale = async (web3) => {
  const sampleCrowdsale = contract(SampleCrowdsale)

  sampleCrowdsale.setProvider(web3.currentProvider)

  let instanceSampleStorageContract = await sampleCrowdsale.deployed()

  return instanceSampleStorageContract
}

export let getSampleCrowdsaleToken = async (web3) => {
  const sampleCrowdsaleToken = contract(SampleCrowdsaleToken)
  sampleCrowdsaleToken.setProvider(web3.currentProvider)

  return sampleCrowdsaleToken
}
