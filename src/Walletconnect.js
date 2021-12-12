import React, { useState } from "react";
import Web3 from "web3";
const Walletconnect = () => {
	const [balance, setBalance] = useState(null);
	const [address, setAddress] = useState(null);
	const [error, setError] = useState(null);
	const Metamask = () => {
		if (!!window.ethereum) {
			window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => accountChangedHandler(result[0]));
		} else {
			setError("Install Metamask");
		}
	};
	const accountChangedHandler = (Accounts) => {
		// window.location.reload();
		setAddress(Accounts);
		getBalance(Accounts.toString());
	};
	const getBalance = (Accounts) => {
		window.ethereum.request({ method: "eth_getBalance", params: [Accounts, "latest"] }).then((balance) => setBalance(Web3.utils.fromWei(balance)));
		//we are here reading the balance from the web3 js
	};
	const ChainsChangedHandler = () => {
		//window will be reloaded when the chains is changed
		console.log("reload the page");
		window.location.reload();
	};
	if (!!window.ethereum) {
		window.ethereum?.on("accountsChanged", accountChangedHandler); //event Listener of the metamask when the account is changed
		window.ethereum?.on("chainChanged", ChainsChangedHandler); //event listener when the chains is changed
	}

	return (
		<>
			This is metamask
			<br />
			<button onClick={Metamask}>Coonnect</button>
			<br />
			<p>Show Address: {balance || 0}</p>
			<p>Show Balance: {address || "0x"}</p>
			<p>{error}</p>
		</>
	);
};

export default Walletconnect;
