import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import Web3Context from "../context/Web3Context";
import { motion } from "framer-motion";

function Withdraw() {

  const { walletData } = useContext(Web3Context);
  const { stakingContract } = walletData;

  const withdrawRef = useRef();

  const withdrawTokens = async (e) => {
    e.preventDefault();
    const amount = withdrawRef.current.value.trim();

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Enter a valid withdrawal amount");
      return;
    }

    const formattedAmount = ethers.parseUnits(amount, 18).toString();

    try {
      const tx = await stakingContract.withdrawStakedTokens(formattedAmount);

      await toast.promise(tx.wait(), {
        loading: "Processing...",
        success: "Withdraw Successful",
        error: "Withdraw Failed",
      });

      withdrawRef.current.value = "";
    } catch (err) {
      toast.error("Withdraw transaction failed");
      console.log(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <p className="text-gray-200 text-lg">Withdraw Staked Tokens</p>

      <input
        ref={withdrawRef}
        placeholder="Enter amount"
        className="w-72 px-5 py-3 bg-transparent border border-gray-500 text-white rounded-md outline-none 
        focus:border-white"
      />

      <button
        onClick={withdrawTokens}
        className="w-72 py-3 bg-white text-black rounded-md transition-all hover:bg-gray-200"
      >
        Withdraw
      </button>
    </motion.div>
  );
}

export default Withdraw;
