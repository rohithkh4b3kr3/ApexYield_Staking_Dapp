import { ethers } from "ethers";
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("Install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });

    const chainId = parseInt(chainIdHex, 16);
    const selectedAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // UPDATE THESE WITH REAL ADDRESSES
    const stakingContractAddress = "YOUR_STAKING_CONTRACT_ADDRESS";
    const stakeTokenContractAddress = "YOUR_TOKEN_CONTRACT_ADDRESS";

    const stakingContract = new ethers.Contract(stakingContractAddress, stakingAbi, signer);
    const stakeTokenContract = new ethers.Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

    return { provider, selectedAccount, stakingContract, stakeTokenContract, chainId };

  } catch (err) {
    console.log("Wallet connect error:", err);
    throw err;
  }
};
