import { useState } from "react";
import Web3Context from "./Web3Context";

function Web3Provider({ children }) {
  const [walletData, setWalletData] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });

  return (
    <Web3Context.Provider value={{ walletData, setWalletData }}>
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Provider;
