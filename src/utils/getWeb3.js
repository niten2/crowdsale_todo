import Web3 from 'web3'

const httpUrl = 'http://127.0.0.1:9545'

let getWeb3 = new Promise(function(resolve, reject) {

  window.addEventListener('load', function() {
    let web3 = window.web3
    // var results

    // // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // if (typeof web3 !== 'undefined') {
    //   // Use Mist/MetaMask's provider.
    //   web3 = new Web3(web3.currentProvider)

    //   results = {
    //     web3: web3
    //   }

    //   console.log('Injected web3 detected.');

    //   resolve(results)
    // } else {

    //   // Fallback to localhost if no web3 injection. We've configured this to
    //   // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider(httpUrl)
    //   // var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    //   console.log(111)
      // var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')

      web3 = new Web3(provider)

      // results = {
      //   web3: web3
      // }

      console.log('No web3 instance injected, using Local web3.');

      // resolve(results)

      resolve(web3)

    // }
  })
})

export default getWeb3
