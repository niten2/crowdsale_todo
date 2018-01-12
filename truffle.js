process.env.NODE_ENV = 'test'

require('babel-register')
require('babel-polyfill')

module.exports = {
  // NOTE for testrpc
  // networks: {
  //   test: {
  //     host: "localhost",
  //     port: 8545,
  //     network_id: "*"
  //   }
  // }
}
