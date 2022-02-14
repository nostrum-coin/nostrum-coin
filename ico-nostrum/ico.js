wallet = null;
raisedAvax = null;
icoContract = '0xad2cdB41787c834Bd71Fa325900f2e5C6299793B'

const tokenAddress = '0x1C4B61d0Be6A061eA844cc0619D6887ba0f1Dc5b';
const tokenSymbol = 'Nostrum';
const tokenDecimals = 18;
const tokenImage = 'https://nostrumcoin758330986.files.wordpress.com/2022/01/desenho-2.png';

const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rate",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "purchaser",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensPurchased",
		"type": "event"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "wallet",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "weiRaised",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const AVALANCHE_MAINNET_PARAMS = {
    chainId: '0xA86A',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/']
}

function addAvalancheNetwork() {
    ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        .catch((error) => {
          console.log(error)
        })
}


async function loginico(){
    if (typeof window.ethereum !== 'undefined') {
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        wallet = accounts[0];
        let connectBtn = document.getElementById('btn-login');
        connectBtn.innerHTML = wallet;
        addAvalancheNetwork();
        document.getElementById('buyicobtn').disabled = false;
        setRaised()
    }
}

async function setRaised(){
    let raisedElem = document.getElementById('avaxraised');
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const NostrumContract = new web3.eth.Contract(ABI, icoContract);
    NostrumContract.methods.weiRaised().call().then(
        function (result) {
            raisedElem.classList.remove("placeholder");
            raisedAvax = parseInt(result) / (10**18)
            raisedElem.innerHTML = raisedAvax;
            setProgress();
        }
    );
}

function setProgress(){
    const maxAvax = 3000;
    let raisedProgressBarElem = document.getElementById('raisedprogressbar');
    if (raisedAvax != null){
        let progress = parseInt((raisedAvax / maxAvax) * 100);
        raisedProgressBarElem.innerHTML = progress + "%";
        if(progress > 3){
            raisedProgressBarElem.style.width = progress + "%";
        }
    }
}

function showIcoInput(){
	var myModal = new bootstrap.Modal(document.getElementById('buyModal'), {
	  focus: false,
  
	});
	myModal.toggle();
	myModal.show();
}

async function buynostrum(){

    if ( (typeof window.ethereum !== 'undefined') && ethereum.isConnected()) {

        let valueAvax = document.getElementById('avaxcost').innerHTML;
        valueAvax = parseFloat(valueAvax) * (10**18);
        valueAvax = parseInt(valueAvax).toString(16);

        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gas: '0x30D40', // customizable by user during MetaMask confirmation.
            to: icoContract, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: valueAvax, // Only required to send ether to the recipient from the initiating external account.
        };
        

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    }

}

function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}


function convertNostrum(event){
    let nostrumValue = event.target.value;
    let avaxValue =  nostrumValue * 0.0000005;
    document.getElementById("avaxcost").innerHTML = avaxValue;
}

async function addTokenMetamask(){
    const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
            },
        },
    });
}