import React, { useContext } from "react";
import Web3Context from "../context/Web3Context";

const ConnectedAccount = () => {

  const { walletData } = useContext(Web3Context);

  return (
    <>
      {walletData?.account && (
        <p className="text-cyan-400 font-semibold mt-4">
          Connected to : {walletData.account.slice(0, 6)}...{walletData.account.slice(-4)}
        </p>
      )}
    </>
  );
};

export default ConnectedAccount;
