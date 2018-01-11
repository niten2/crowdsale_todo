require('babel-register')
require('babel-polyfill')

module.exports = {
  networks: {
    development: {
      host: "localhost",
      // port: 8545,
      port: 7545,
      // network_id: "*"
      network_id: "*"
    }
  }
}
