addressContract = "0x1C4B61d0Be6A061eA844cc0619D6887ba0f1Dc5b"
contractChain = "avalanche"

const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "doStake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "vVtIdx",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "powerVt",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "vBrIdx",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "powerBr",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "vDtIdx",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "powerDt",
				"type": "uint256"
			}
		],
		"name": "doVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBurnRate",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractTick",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakeadress",
				"type": "address"
			}
		],
		"name": "getInteresting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "idx",
				"type": "uint32"
			}
		],
		"name": "getPowerBurnRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "idx",
				"type": "uint32"
			}
		],
		"name": "getPowerDailyTax",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "idx",
				"type": "uint32"
			}
		],
		"name": "getPowerVoteTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakeadress",
				"type": "address"
			}
		],
		"name": "getStackedValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTimePassed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoteTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getVotesAdrs",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getdailyTax",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakeadress",
				"type": "address"
			}
		],
		"name": "getdaysPassed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unStake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

async function getTimeVotes() {
    let user = Moralis.User.current();
    if (user) {
        const options = {
            chain: contractChain,
            address: addressContract,
            function_name: "getPowerVoteTime",
            abi: ABI,
            params: {'idx': '1'}
        };
        timeVotes0 = await Moralis.Web3API.native.runContractFunction(options);
        console.log(timeVotes0)
    }
}

async function setInfo() {
    let user = Moralis.User.current();
	let infoElem = document.getElementById('infolabel');

    if (user) {
        const options = {
            chain: contractChain,
            address: addressContract,
            function_name: "getStackedValue",
            abi: ABI,
            params: {'stakeadress': user.get("ethAddress")}
        };
        stakedValue = await Moralis.Web3API.native.runContractFunction(options);
        infoElem.innerHTML = "Stacked: " + (stakedValue/(10**18)) + " Nostrum";
    }
}

function showStackInput(){
	var myModal = new bootstrap.Modal(document.getElementById('stackModal'), {
	  focus: false,
  
	});
	myModal.toggle();
	myModal.show();
}

async function stackValue() {
    let user = Moralis.User.current();
	let valueInput = document.getElementById('nostrumStackValueInp');

    if (user) {
		let amount = (valueInput.value * (10**18))

        const options = {
            chain: contractChain,
            contractAddress: addressContract,
            functionName: "doStake",
            abi: ABI,
            params: {'amount': amount+""}
        };
        await Moralis.executeFunction(options).then(function (confirm) {
			showMsg("Value stacked");
		})
		.catch(function (error) {
			if (error.data != null)
				showError(error.message + error.data.message)
			else
				showError(error.message)
			console.log(error);
		});
    }
}

function showUnStackInput(){
	var myModal = new bootstrap.Modal(document.getElementById('unStackModal'), {
	  focus: false,
  
	});
	myModal.toggle();
	myModal.show();
}

async function unStackValue() {
    let user = Moralis.User.current();
	let valueInput = document.getElementById('nostrumUnStackValueInp');

    if (user) {
		let amount = (valueInput.value * (10**18))

        const options = {
            chain: contractChain,
            contractAddress: addressContract,
            functionName: "unStake",
            abi: ABI,
            params: {'amount': amount+""}
        };
        await Moralis.executeFunction(options).then(function (confirm) {
			showMsg("Value unstacked");
		})
		.catch(function (error) {
			if (error.data != null)
				showError(error.message + error.data.message)
			else
				showError(error.message)
			console.log(error);
		});
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setChart() {
    let user = Moralis.User.current();

    if (user) {
		let votesTime = [0,0,0,0,0]
	
		for (var i = 1; i <= 5; i++) {
			const options = {
				chain: contractChain,
				address: addressContract,
				function_name: "getPowerVoteTime",
				abi: ABI,
				params: {'idx': i+''}
			};
			let votes_idx_i = await Moralis.Web3API.native.runContractFunction(options);
			votes_idx_i = votes_idx_i / (10**18);
			votesTime[i-1] = votes_idx_i;
			console.log(i, votesTime[i-1]);
			await sleep(2000);
		}

		for (var i = 1; i <= 5; i++) {
			groupDatag[0].values[i-1].grpValue = votesTime[i-1];
		}

		let votesBurn = [0,0,0,0,0]

		for (var i = 1; i <= 5; i++) {
			const options = {
				chain: contractChain,
				address: addressContract,
				function_name: "getPowerBurnRate",
				abi: ABI,
				params: {'idx': i+''}
			};
			let votes_idx_i = await Moralis.Web3API.native.runContractFunction(options);
			votes_idx_i = votes_idx_i / (10**18);
			votesBurn[i-1] = votes_idx_i;
			await sleep(2000);
		}

		let votesStack = [0,0,0,0,0]

		for (var i = 1; i <= 5; i++) {
			const options = {
				chain: contractChain,
				address: addressContract,
				function_name: "getPowerDailyTax",
				abi: ABI,
				params: {'idx': i+''}
			};
			let votes_idx_i = await Moralis.Web3API.native.runContractFunction(options);
			votes_idx_i = votes_idx_i / (10**18);
			votesStack[i-1] = votes_idx_i;
			await sleep(2000);
		}

		for (var i = 1; i <= 5; i++) {
			groupDatag[0].values[i-1].grpValue = votesTime[i-1];
		}

		for (var i = 1; i <= 5; i++) {
			groupDatag[1].values[i-1].grpValue = votesBurn[i-1];
		}

		for (var i = 1; i <= 5; i++) {
			groupDatag[2].values[i-1].grpValue = votesStack[i-1];
		}
    }

	d3.select('#graphcanvas').select("svg").remove();
	drawGraph(groupDatag, 600,400);
}

async function vote(){
	let valueTimeVote = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
	let valueBurnVote = document.querySelector('input[name="inlineRadioOptions2"]:checked').value;
	let valueStackVote = document.querySelector('input[name="inlineRadioOptions3"]:checked').value;
	let powerVt = document.getElementById('powervt').value;
	let powerBr = document.getElementById('powerbr').value;
	let powerSp = document.getElementById('powersp').value;

	if ((valueTimeVote != null) && (valueBurnVote != null) && (valueStackVote != null) && 
		(powerVt != null) && (powerBr != null) && (powerSp != null) &&
		(powerVt > 0) && (powerBr > 0) && (powerSp > 0)
	
	){
		let amountVt = (powerVt * (10**18))+""
		let amountBr = (powerBr * (10**18))+""
		let amountSp = (powerSp * (10**18))+""

		const options = {
            chain: contractChain,
            contractAddress: addressContract,
            functionName: "doVote",
            abi: ABI,
            params: {'vVtIdx': valueTimeVote+"", 'powerVt': amountVt, 'vBrIdx': valueBurnVote+"", 'powerBr':amountBr, 'vDtIdx': valueStackVote+"", 'powerDt': amountSp}
        };
        await Moralis.executeFunction(options).then(function (confirm) {
			showMsg("Voted!");
		}).catch(function (error) {
			if (error.data != null)
				showError(error.message + error.data.message)
			else
				showError(error.message)
			console.log(error);
		});
	} 

}

function showSendInput(){
	var myModal = new bootstrap.Modal(document.getElementById('sendModal'), {
	  focus: false,
  
	});
	myModal.toggle();
	myModal.show();
}

async function send(){
	let ammount = document.getElementById('nostrumSendAmountInp').value;
	let address = document.getElementById('nostrumSendAdressInp').value;

	if ((ammount != null) && (address != null)){
		const options = {type: "erc20", 
			amount: Moralis.Units.Token(ammount, "18"), 
			receiver: address,
			contractAddress: addressContract
		}

		await Moralis.transfer(options).then(function (tx) {
			showMsg("Sent!");
		}).catch(function (error) {
			if (error.data != null)
				showError(error.message + error.data.message)
			else
				showError(error.message)
			console.log(error);
		});
	}
}

async function setElectionTime(){
	let electionTimeElem = document.getElementById('hourstofinish')

	if(electionTimeElem != null){
		const options = {
            chain: contractChain,
            address: addressContract,
            function_name: "getTimePassed",
            abi: ABI,
            params: {}
        };
        let timePassed = await Moralis.Web3API.native.runContractFunction(options);

		const options2 = {
            chain: contractChain,
            address: addressContract,
            function_name: "getVoteTime",
            abi: ABI,
            params: {}
        };
        let votetimeactual = await Moralis.Web3API.native.runContractFunction(options2);

		let secondstofinish = votetimeactual - timePassed;
		let hourstofinish = (secondstofinish / 60 / 60).toFixed(2);

        electionTimeElem.innerHTML = hourstofinish;
	}
}