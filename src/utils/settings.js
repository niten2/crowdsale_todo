export default {

  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.PORT || 3000,

  isEnvDev: process.env.NODE_ENV === "development",
  isEnvTest: process.env.NODE_ENV === "test",
  isEnvProd: process.env.NODE_ENV === "production",

  web3Url: process.env.REACT_APP_WEB3_URL,
}
