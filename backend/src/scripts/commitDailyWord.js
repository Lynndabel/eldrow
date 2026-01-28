const { ethers } = require("ethers");
const { baseWordDaily } = require("../blockchain/baseWordDaily");

function getUtcDayYYYYMMDD() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  return Number(`${yyyy}${mm}${dd}`);
}

// TODO: replace with real daily word selection logi
async function selectTodayWord() {
  return "CRANE";
}

async function main() {
  const day = getUtcDayYYYYMMDD();
  const word = await selectTodayWord();

  const wordHash = ethers.solidityPackedKeccak256(["string"], [word]);
  console.log("Committing daily word:", { day, word, wordHash });

  const tx = await baseWordDaily.commitDailyWord(day, wordHash);
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx mined in block", receipt.blockNumber);
}

main().catch((err) => {
  console.error("Error committing daily word:", err);
  process.exit(1);
});
