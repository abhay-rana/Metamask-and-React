import Web3 from "web3";
import { contract_details } from "./contract_det";

// console.log(contract_details.abi);

let web3 = new Web3(window.ethereum);

let contract = new web3.eth.Contract(contract_details.abi, contract_details.address);

export const checkCorrectNetwork = async () => {
	let chainId;
	chainId = await web3.eth.getChainId();
	console.log(chainId);
	return chainId;
};

export const getUserBalance = async () => {
	let address = await getUserAddress();
	let balance = await web3.eth.getBalance(address);
	let mainBalance = web3.utils.fromWei(balance);
	console.log(mainBalance);
	return mainBalance;
};

export const getUserAddress = async () => {
	const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
	const account = accounts[0];
	return account;
};

export const taskArrays = async () => {
	let count_Array = await contract.methods.showTasks().call();
	console.log(count_Array);
	return count_Array;
};
