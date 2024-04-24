// scripts/check-network.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer Address:", deployer.address);
    console.log("Deployer Balance:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Failed to check network:", error);
        process.exit(1);
    });
