# TODO – BaseWordDaily & Farcaster Miniapp

## 1. Smart contract (Base)

- [ ] Initialize npm project in repo root (`npm init -y` if needed)
- [ ] Install dependencies (`npm install` in repo root)
- [ ] Set up `.env` with `PRIVATE_KEY`, `BASE_SEPOLIA_RPC_URL`, `BASE_MAINNET_RPC_URL`
- [ ] `npx hardhat compile`
- [ ] Deploy `BaseWordDaily` to Base Sepolia (`npm run deploy:base-sepolia`)
- [ ] Verify contract on Base Sepolia explorer (optional)
- [ ] Deploy to Base Mainnet (`npm run deploy:base`) once tested
- [ ] Record deployed addresses for backend integration

## 2. Backend / Farcaster miniapp

- [ ] Install backend dependencies (`cd backend && npm install`)
- [ ] Create backend `.env` with:
  - [ ] `PRIVATE_KEY` (same owner as contract)
  - [ ] `BASE_SEPOLIA_RPC_URL` or `BASE_MAINNET_RPC_URL`
  - [ ] `BASE_NETWORK` ("baseSepolia" or "base")
  - [ ] `BASE_WORD_DAILY_ADDRESS` (deployed contract address)
- [ ] Implement real daily word selection logic (off-chain)
- [ ] Wire scheduler (cron / job) to run `npm run commit-daily-word` at 00:00 UTC
- [ ] Implement off-chain game logic (word guessing, attempts, emoji grid, FID+date session state)
- [ ] Implement Farcaster miniapp / Frames routes using this backend
- [ ] Integrate public verification using `/verify` endpoint in miniapp UI

## 3. Optional – Proof of Completion NFT (Post-MVP)

- [ ] Design non-transferable NFT contract (soulbound)
- [ ] Enforce one NFT per address per day
- [ ] Restrict minting to backend authorization
- [ ] Integrate mint flow into backend after successful completion

## 4. Demo & Validation

- [ ] Run a full-day flow on Base Sepolia:
  - [ ] Commit hash at 00:00 UTC
  - [ ] Play daily word game via Farcaster miniapp (off-chain logic)
  - [ ] Reveal word off-chain
  - [ ] Verify on-chain with `verifyWord` or `/verify` endpoint
- [ ] Prepare demo script explaining fairness and trust guarantees
