import React from "react";
import { motion } from "framer-motion";

import Wallet from "./components/Wallet";
import ConnectedAccount from "./Navigation/ConnectedAccount";

import StakeActions from "./DisplayPanel/StakeActions";
import Withdraw from "./DisplayPanel/Withdraw";
import StakingStats from "./DisplayPanel/StakingStats";
import LiveRewards from "./DisplayPanel/LiveRewards";

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center overflow-hidden">

      {/* Background Floating Lights */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 blur-[150px] opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 blur-[180px] opacity-25 rounded-full animate-pulse"></div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.4, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center text-cyan-400 text-6xl drop-shadow-[0_0_25px_#00ffff]"
      >
        APEX<span className="text-white">Yield</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="text-gray-300 text-center mt-3 text-xl"
      >
        Stake • Earn • Repeat
      </motion.p>

      {/* Dashboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-14 z-10"
      >

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="space-y-10"
        >

          {/* WALLET CARD */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-xl p-8 shadow-[0_0_40px_#00ffff40]"
          >
            <h2 className="text-xl text-gray-200 mb-3">Wallet</h2>
            <Wallet />
            <ConnectedAccount />
          </motion.div>

          {/* STAKE ACTIONS */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-xl p-8 shadow-[0_0_40px_#00ffff40]"
          >
            <StakeActions />
          </motion.div>

          {/* WITHDRAW CARD */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-xl p-8 shadow-[0_0_40px_#00ffff40]"
          >
            <Withdraw />
          </motion.div>

        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="space-y-10"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-2xl border border-gray-600 rounded-xl p-8 shadow-[0_0_40px_#00ffff40]"
          >
            <StakingStats />
            <LiveRewards />
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;
