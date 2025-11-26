import React, { useContext, useEffect } from "react";
import { connectWallet } from "./connectWallet";
import Web3Context from "../context/Web3Context";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import ConnectedNetwork from "../Navigation/ConnectedNetwork";

function Wallet() {

  const { walletData, setWalletData } = useContext(Web3Context);
    useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = (accounts) => {
      handleAccountChange(setWalletData, accounts);
    };

    const onChainChanged = () => {
      handleChainChange(setWalletData);
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onChainChanged);
    };

  }, [setWalletData]);

  const handleWallet = async () => {
    try {
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } =
        await connectWallet();

      setWalletData({
        provider,
        account: selectedAccount,
        stakingContract,
        stakeTokenContract,
        chainId,
      });

      console.log("Wallet connected:", selectedAccount);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleWallet}
        className="px-8 py-3 rounded-xl bg-white text-black font-serif text-xl hover:bg-cyan-100 hover:scale-105 hover: font-mono shadow-[0_0_20px_#00ffff] duration-300"
      >
        Connect Wallet
      </button>
      <ConnectedNetwork/>

      
    </>
  );
}

export default Wallet;