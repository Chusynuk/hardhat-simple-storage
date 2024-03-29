import { ethers, run, network } from "hardhat"

const ETHERSCAN_API_KEY = Boolean(process.env.ETHERSCAN_API_KEY)

const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract....")

  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log(`Deployed contract to: ${simpleStorage.address}`)

  console.log("network.config", network.config)

  if (network.config.chainId === 5 && ETHERSCAN_API_KEY) {
    console.log("Waiting for blocks to be mined...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is:  ${currentValue}`)

  //Update current value
  const transactionResponse = await simpleStorage.store("7")
  await transactionResponse.wait(1)

  const updatedValue = await simpleStorage.retrieve()

  console.log(`Updated value is: ${updatedValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract....")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(error)
    }
  }
}

main()
  .then(() => process?.exit(0))
  .catch((eror) => {
    console.error(eror)
    process.exit(1)
  })
