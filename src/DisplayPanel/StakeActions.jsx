import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import Web3Context from "../context/Web3Context";

function StakeActions() {

  const { walletData } = useContext(Web3Context);
  const { stakeTokenContract, stakingContract } = walletData;

  const approveRef = useRef();
  const stakeRef = useRef();

  if (!stakeTokenContract || !stakingContract) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Connect wallet to enable staking
      </p>
    );
  }

  const approveToken = async () => {
    const amount = approveRef.current.value.trim();
    if (!amount || isNaN(amount) || amount <= 0) return toast.error("Invalid amount");
    const formatted = ethers.parseUnits(amount, 18).toString();
    try {
      const tx = await stakeTokenContract.approve(stakingContract.target, formatted);
      await toast.promise(tx.wait(), { loading: "Processing...", success: "Approved", error: "Failed" });
      approveRef.current.value = "";
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const stakeToken = async () => {
    const amount = stakeRef.current.value.trim();
    if (!amount || isNaN(amount) || amount <= 0) return toast.error("Invalid amount");
    const formatted = ethers.parseUnits(amount, 18).toString();
    try {
      const tx = await stakingContract.stake(formatted);
      await toast.promise(tx.wait(), { loading: "Processing...", success: "Staked", error: "Failed" });
      stakeRef.current.value = "";
    } catch (err) {
      toast.error("Staking failed");
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-200">Approve Token</p>
      <input ref={approveRef} placeholder="Enter amount"
        className="w-72 px-5 py-3 border border-gray-500 bg-transparent text-white rounded-md" />
      <button onClick={approveToken}
        className="w-72 py-3 bg-white text-black rounded-md hover:bg-gray-200">Approve</button>

      <p className="text-gray-200 pt-4">Stake Tokens</p>
      <input ref={stakeRef} placeholder="Enter amount"
        className="w-72 px-5 py-3 border border-gray-500 bg-transparent text-white rounded-md" />
      <button onClick={stakeToken}
        className="w-72 py-3 bg-white text-black rounded-md hover:bg-gray-200">Stake</button>
    </div>
  );
}

export default StakeActions;
