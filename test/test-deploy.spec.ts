import hre from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  let peopleArr = []
  beforeEach(async () => {
    simpleStorageFactory = (await hre.ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory

    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    // assert.equal(currentValue.toString(), expectedValue)
    expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should update when we call store", async () => {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should add a person name and favourite number to array", async () => {
    const name = "Bob"
    const favoriteNumber = "88"

    const updatedArray = await simpleStorage.addPerson(name, favoriteNumber)
    await updatedArray.wait(1)

    const _updatedArray = await simpleStorage.peopleList

    expect(_updatedArray).to.have.lengthOf(1)
  })
})
