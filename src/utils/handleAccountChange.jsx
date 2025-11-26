export const handleAccountChange = (setWalletData, accounts) => {
  setWalletData((prevData) => ({
    ...prevData,
    account: accounts[0] || null,
  }));
};

