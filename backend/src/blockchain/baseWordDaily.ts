import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const {
  PRIVATE_KEY,
  BASE_SEPOLIA_RPC_URL,
  BASE_MAINNET_RPC_URL,
  BASE_NETWORK,
  BASE_WORD_DAILY_ADDRESS
} = process.env;

const rpcUrl = BASE_NETWORK === "base" ? BASE_MAINNET_RPC_URL : BASE_SEPOLIA_RPC_URL;

if (!rpcUrl) {
  throw new Error("Missing RPC URL for Base network (BASE_SEPOLIA_RPC_URL or BASE_MAINNET_RPC_URL)");
}

if (!PRIVATE_KEY) {
  throw new Error("Missing PRIVATE_KEY in environment");
}

if (!BASE_WORD_DAILY_ADDRESS) {
  throw new Error("Missing BASE_WORD_DAILY_ADDRESS in environment");
}

const provider = new ethers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const BASE_WORD_DAILY_ABI = [
  "function commitDailyWord(uint256 day, bytes32 wordHash) external",
  "function verifyWord(uint256 day, string word) external view returns (bool)",
  "function dailyWordHash(uint256 day) external view returns (bytes32)"
] as const;

const baseWordDaily = new ethers.Contract(
  BASE_WORD_DAILY_ADDRESS,
  BASE_WORD_DAILY_ABI,
  signer
);

export { baseWordDaily, provider };
