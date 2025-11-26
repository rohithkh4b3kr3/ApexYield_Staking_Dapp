import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../context/Web3Context";
import { motion } from "framer-motion";
import { ethers } from "ethers";

function StakingStats() {
  const { walletData } = useContext(Web3Context);
  const { stakingContract, account } = walletData;

  const [stakedAmount, setStakedAmount] = useState("0");
  const [earnedRewards, setEarnedRewards] = useState("0");
  const [rewardRate, setRewardRate] = useState("0");

  const loadStats = async () => {
    try {
      if (!stakingContract || !account) return;

      const stake = await stakingContract.stakedBalance(account);
      const earned = await stakingContract.earned(account);
      const rate = await stakingContract.REWARD_RATE();

      setStakedAmount(ethers.formatUnits(stake, 18));
      setEarnedRewards(ethers.formatUnits(earned, 18));
      setRewardRate(ethers.formatUnits(rate, 18));
    } catch (error) {
      console.log("Error loading stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, [stakingContract, account]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-10 text-center"
    >

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl text-cyan-400 tracking-wider drop-shadow-[0_0_25px_#00ffff]"
      >
        STAKING DASHBOARD
      </motion.h2>

      <div className="mt-8 space-y-4 text-2xl text-gray-200">
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="drop-shadow-[0_0_10px_#00ffffaa]"
        >
          Staked: <span className="text-cyan-400">{stakedAmount} TOKEN</span>
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="drop-shadow-[0_0_10px_#00ffffaa]"
        >
          Earned Rewards: <span className="text-cyan-400">{earnedRewards} RWD</span>
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="drop-shadow-[0_0_10px_#00ffffaa]"
        >
          Reward Rate: <span className="text-cyan-400">{rewardRate} / sec</span>
        </motion.p>
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={loadStats}
        className="mt-10 px-10 py-3 rounded-full bg-cyan-500 text-black text-xl tracking-wide shadow-[0_0_25px_#00ffff] hover:shadow-[0_0_40px_#00ffff]"
      >
        Refresh
      </motion.button>
    </motion.div>
  );
}

export default StakingStats;
