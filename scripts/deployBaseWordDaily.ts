import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying BaseWordDaily with account:", deployer.address);

  const BaseWordDaily = await ethers.getContractFactory("BaseWordDaily");
  const contract = await BaseWordDaily.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("BaseWordDaily deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
