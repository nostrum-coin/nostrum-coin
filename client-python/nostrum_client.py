from constants import NostrumConstants
import sys
import json

from web3 import Web3
from web3.middleware import geth_poa_middleware

class NostrumClient:

    avax_net = "https://api.avax-test.network/ext/bc/C/rpc"
    contract_address = "0xC052536406c6edFF042F4279849C9a824f58b066"
    chain_id = 43113
    digit_divisor = 10 ** 18
    web3 = None
    contract = None

    def __init__(self):
        if not self.connect():
            raise Exception("[Error] Could not connect")
        self.init_nostrum_contract()
        

    def connect(self):
        self.web3 = Web3(Web3.HTTPProvider(self.avax_net))
        self.web3.middleware_onion.inject(geth_poa_middleware, layer=0)
        return self.web3.isConnected()

    def init_nostrum_contract(self):
        with open('abi.json') as json_file:
            abi = json.load(json_file)
        self.contract = self.web3.eth.contract(address=self.contract_address, abi=abi)

    def get_avax_balance(self, address):
        return self.web3.eth.get_balance(address) / self.digit_divisor

    def get_nostrum_balance(self, address):
        sum_address = self.web3.toChecksumAddress(address)
        return self.contract.functions.balanceOf(sum_address).call()  / self.digit_divisor

    def get_nostrum_total(self):
        return self.contract.functions.totalSupply().call() / self.digit_divisor

    def get_contract_tick(self):
        return self.contract.functions.getContractTick().call()

    def get_time_passed(self):
        return self.contract.functions.getTimePassed().call()

    def get_votes_time(self, idx):
        return self.contract.functions.getPowerVoteTime(idx).call() / self.digit_divisor

    def get_votes_burn(self, idx):
        return self.contract.functions.getPowerBurnRate(idx).call() / self.digit_divisor

    def get_votes_stack(self, idx):
        return self.contract.functions.getPowerDailyTax(Web3.toInt(idx)).call() / self.digit_divisor

    def check_voted(self, address):
        sum_address = self.web3.toChecksumAddress(address)
        return self.contract.functions.getVoted(sum_address).call()

    def get_vote_time_election(self):
        return NostrumConstants.voteTime_to_str(self.contract.functions.getVoteTime().call())

    def get_burn_rate(self):
        return NostrumConstants.burn_to_str(self.contract.functions.getBurnRate().call())

    def get_daily_tax(self):
        return NostrumConstants.dailyTax_to_str(self.contract.functions.getdailyTax().call())

    def get_stacked_value(self, address):
        sum_address = self.web3.toChecksumAddress(address)
        return self.contract.functions.getStackedValue(sum_address).call() / self.digit_divisor

    def get_days_passed(self, address):
        sum_address = self.web3.toChecksumAddress(address)
        return self.contract.functions.getdaysPassed(sum_address).call()

    def get_interesting(self, address):
        sum_address = self.web3.toChecksumAddress(address)
        return self.contract.functions.getInteresting(sum_address).call() / self.digit_divisor

    def vote(self, address, vVtIdx, vBrIdx, vDtIdx, gas, gasPrice):
        voteFunc = self.contract.functions.doVote(vVtIdx, vBrIdx, vDtIdx)
        voteT = self.build_transaction(voteFunc, address, gas, gasPrice)
        return voteT
    
    def stake(self, address, amount, gas, gasPrice):
        int_amount = int(self.digit_divisor * amount)
        stakeFunc = self.contract.functions.doStake(int_amount)
        stakeT = self.build_transaction(stakeFunc, address, gas, gasPrice)
        return stakeT

    def unstake(self, address, amount, gas, gasPrice):
        int_amount = int(self.digit_divisor * amount)
        unstakeFunc = self.contract.functions.unStake(int_amount)
        unstakeT = self.build_transaction(unstakeFunc, address, gas, gasPrice)
        return unstakeT

    def build_transaction(self, function, address, gas, gasPrice):
        t = function.buildTransaction({
                'chainId': self.chain_id, 
                'gas': 300000,
                'maxFeePerGas': self.web3.toWei('30', 'gwei'),
                'nonce': self.web3.eth.getTransactionCount(address)
            }
        )
        
        if gas is not None:
            t['gas'] = gas

        if gasPrice is not None:
            t['maxFeePerGas'] = self.web3.toWei(str(gasPrice), 'gwei')

        return t

    def sign_transaction(self, transaction, private_key):
        return self.web3.eth.account.signTransaction(transaction, private_key)

    def send_raw_transaction(self, transaction):
        return self.web3.eth.sendRawTransaction(transaction.rawTransaction)

    def get_transaction(self, transaction_str):
        return self.web3.eth.get_transaction_receipt(transaction_str)