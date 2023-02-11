import { DeployResult, DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
const { network } = require("hardhat")

const deploySimpleStorage: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deploy } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const chainId = network.config.chainId

  const simpleStorage: DeployResult = await deploy("SimpleStorage", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: chainId == 31337 ? 1 : 6,
  })
}

export default deploySimpleStorage
deploySimpleStorage.tags = ["all", "simpleStorage"]
