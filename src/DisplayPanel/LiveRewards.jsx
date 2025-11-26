import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";
import { motion } from "framer-motion";

function LiveRewards() {

  const { walletData } = useContext(Web3Context);
  const { stakingContract, account } = walletData;

  const [rewardValue, setRewardValue] = useState("0");

  const loadReward = async () => {
    if (!stakingContract || !account) return;
    try {
      const earned = await stakingContract.earned(account);
      setRewardValue(ethers.formatUnits(earned, 18));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadReward();
    const interval = setInterval(loadReward, 1000);
    return () => clearInterval(interval);
  }, [stakingContract, account]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mt-6 space-y-2"
    >

      <p className="text-gray-300 text-lg tracking-wide">
        Live Rewards
      </p>

      <motion.p
        key={rewardValue}
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl text-cyan-400 tracking-wide"
      >
        {rewardValue} RWD
      </motion.p>
    </motion.div>
  );
}

export default LiveRewards;
