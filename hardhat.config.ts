import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "dotenv/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
// import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"
import "hardhat-deploy"
import "./tasks/block-number.ts"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
// const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    hardhat: {
      chainId: 31337,
      // accounts: Hardhat already took care of it
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: COINMARKETCAP_KEY, // TODO get API KEY in Coinmarketcap
  },
}
