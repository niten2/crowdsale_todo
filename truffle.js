process.env.NODE_ENV = 'test'

require('babel-register')

module.exports = {
  networks: {
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  }
}
