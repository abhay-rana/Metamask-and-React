import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { checkCorrectNetwork, getUserAddress, getUserBalance } from "./Actions";

import ShowTask from "./ShowTask.js";

export let web3 = new Web3(window.ethereum);

const App = () => {
	const [account, setAccount] = useState("");
	const [metamask, setmetamask] = useState(true);
	const [chainId, setChainId] = useState("");
	const [balance, setBalance] = useState("");
	// const [showTask, setshowTask] = useState([]);

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", openMetamaskbtn);
			window.ethereum.on("chainChanged", () => window.location.reload());
		}
	}, []);

	const openMetamaskbtn = async () => {
		if (window.ethereum) {
			const get_balance = await getUserBalance();
			setBalance(get_balance);
			const get_account = await getUserAddress();
			setAccount(get_account);
			const get_chainId = await checkCorrectNetwork();
			setChainId(get_chainId);
		} else {
			setmetamask(false);
		}
	};

	return (
		<>
			{!account ? (
				<>
					<button onClick={openMetamaskbtn}>Connect</button>
					<div>Firstly Connect To the Blockchians</div>
				</>
			) : (
				<>
					<div>Connects users : {account}</div>
					<div>Chain Id is :{chainId}</div>
					<div>Balance is :{balance}</div>
					<br />
					<div>The Tasks Are</div>
					<br />
					<ShowTask data={{ account, chainId, balance }} />
				</>
			)}
			{!metamask ? <div>Firstly install the metamask</div> : null}
		</>
	);
};

export default App;
