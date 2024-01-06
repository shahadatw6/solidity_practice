const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.27.48.1:7545"
  );
  const wallet = new ethers.Wallet(
    "745bd615dde05b77b1bc2beb5e769145e6771644ae83e310658fff7ec292f469",
    provider
  );

  const abi = fs.readFileSync("./ss_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./ss_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy();

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
