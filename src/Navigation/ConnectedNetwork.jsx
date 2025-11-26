import React, { useContext } from "react";
import Web3Context from "../context/Web3Context";

function ConnectedNetwork() {
  const { walletData } = useContext(Web3Context);

  const chainName =
    walletData?.chainId === 11155111
      ? "Sepolia  Network"
      : "Unsupported Network";

  return (
    <>
      {walletData?.chainId && (
        <p className="text-white font-semibold mt-4">
          Connected to: {chainName}
        </p>
      )}
    </>
  );
}

export default ConnectedNetwork;
