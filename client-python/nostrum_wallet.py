from nostrum_client import NostrumClient

class NostrumWallet:

    def __init__(self, wallet_adress, private_key=None) -> None:
        self.client = NostrumClient()
        self.wallet_adress = wallet_adress
        self.private_key = private_key

    def set_private_key(self, private_key):
        self.private_key = private_key

    def send_sign_transaction(self, transaction):
        signed_vote = self.client.sign_transaction(transaction, self.private_key)
        txn_hash = self.client.send_raw_transaction(signed_vote)
        txn_str = str(bytes(txn_hash).hex())
        return txn_str

    def get_avax_balance(self):
        return self.client.get_avax_balance(self.wallet_adress)

    def get_nostrum_balance(self):
        return self.client.get_nostrum_balance(self.wallet_adress)
    
    def voted(self):
        return self.client.check_voted(self.wallet_adress)

    def stacked_value(self):
        return self.client.get_stacked_value(self.wallet_adress)

    def days_staking(self):
        return self.client.get_days_passed(self.wallet_adress)

    def earnings_from_staking(self):
        return self.client.get_interesting(self.wallet_adress)

    def vote(self, vVtIdx, powerVt, vBrIdx, powerBr, vDtIdx, powerDt, gas=None, gasPrice=None):
        if self.private_key is not None:
            vote_transaction = self.client.vote(self.wallet_adress, vVtIdx, powerVt, vBrIdx, powerBr, vDtIdx, powerDt, gas=gas, gasPrice=gasPrice)
            txn_str = self.send_sign_transaction(vote_transaction)
            return txn_str
        return None
    
    def stake(self, amount, gas=None, gasPrice=None):
        if self.private_key is not None:
            stake_transaction = self.client.stake(self.wallet_adress, amount, gas, gasPrice)
            txn_str = self.send_sign_transaction(stake_transaction)
            return txn_str
        print("wtf")
        return None

    def unstake(self, amount, gas=None, gasPrice=None):
        if self.private_key is not None:
            unstake_transaction = self.client.unstake(self.wallet_adress, amount, gas, gasPrice)
            txn_str = self.send_sign_transaction(unstake_transaction)
            return txn_str
        return None