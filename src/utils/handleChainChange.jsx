export const handleChainChange = async (setWalletData) => {
  const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
  const chainId = parseInt(chainIdHex, 16);
  console.log("Chain changed to:", chainId);

  setWalletData((prevData) => ({
    ...prevData,
    chainId,
  }));
};
