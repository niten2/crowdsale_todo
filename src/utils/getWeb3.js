import Web3 from 'web3'

let getWeb3 = () => {
  const httpUrl = 'http://127.0.0.1:9545'
  let provider = new Web3.providers.HttpProvider(httpUrl)

  return new Web3(provider)
}

export default getWeb3
