import { AddressLookupTableAccount, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

function isValidSolanaAddress(address) {
    try {
        const decoded = bs58.decode(address);
        return decoded.length === 32;
    } catch (error) {
        return false;
    }
}

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("❌ Provide a public key to check the balance of!");
}

if (!isValidSolanaAddress(suppliedPublicKey)) {
    console.error("❌ Invalid Solana Wallet address provided.");
    process.exit(1);
}

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

async function checkBalance(publicKeyString) {
    try {
        const publicKey = new PublicKey(publicKeyString);

        const balanceInLamports = await connection.getBalance(publicKey);

        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(
            `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
        );
    } catch (error) {
        console.error(
            "❌ An error occurred while fetching the balance:", error
        );
    }
}

checkBalance(suppliedPublicKey)