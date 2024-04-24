async function main() {
    console.log("Starting deployment script...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    console.log("Getting contract factory...");
    const TreasureBlox = await ethers.getContractFactory("TreasureBlox");

    console.log("Deploying TreasureBlox...");
    const treasureBlox = await TreasureBlox.deploy();
  
    console.log("TreasureBlox deployed to:", treasureBlox.address);
}

main()
    .then(() => {
        console.log("Deployment script finished.");
        process.exit(0);
    })
    .catch(error => {
        console.error("Error in deployment script:", error);
        process.exit(1);
    });
