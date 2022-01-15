from constants import NostrumConstants
from nostrum_client import NostrumClient
import sys
from getpass import getpass
from nostrum_wallet import NostrumWallet


import logging
logging.basicConfig(filename='error.log', filemode="w", level=logging.DEBUG, 
                    format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger=logging.getLogger(__name__)


AVAX_EXPLORER = "https://testnet.snowtrace.io"

def get_wallet():
    print("==== Nostrum Wallet ====")
    wallet = input("Enter your address:")
    return wallet

def print_menu(nostrum_wallet : NostrumWallet):
    print("\n")
    print("==== Nostrum Wallet ====")
    print("Nostrum balance:", nostrum_wallet.get_nostrum_balance(), 
            "| Avax balance:", nostrum_wallet.get_avax_balance())

    if nostrum_wallet.stacked_value() > 0:
        print("Stacked Nostrum:", nostrum_wallet.stacked_value(), 
            "("+str(nostrum_wallet.days_staking())+" days)", 
            "Interesting:", str(nostrum_wallet.earnings_from_staking()), 
            "Total:", str(nostrum_wallet.stacked_value()+nostrum_wallet.earnings_from_staking()))

    if nostrum_wallet.voted():
        print("\n! You already voted in the current election")
    else:
        print("\n! You did not vote in the current election yet")

    print("-------------")
    if nostrum_wallet.private_key == None:
        print("0. Set private key")
        print("1. Election stats")
    else:
        print("1. Election stats")
        print("2. Vote")
        print("3. Stack")
        print("4. UnStake")
    option = int(input("Select option:"))
    return option


def get_private_key():
    print("IMPORTANT!!!")
    print("Never show you private key to anyone")
    print("Someone with your private key own your wallet")
    print("")
    private_key = getpass("Insert your private key:")
    return private_key

def print_election_stats(client : NostrumClient):
    print("\n")
    print("== Election number", client.get_contract_tick(), "==")
    print("Election time:", client.get_time_passed(), "/", client.get_vote_time_election())
    print("---------------------------------")
    print("- Current election time:", client.get_vote_time_election())
    print("- Current burn rate:", client.get_burn_rate())
    print("- Current stack earnings:", client.get_daily_tax())
    print("---------------------------------")
    print("===== Votes: =====")
    print("Time next election:")
    for i in range(1, 6):
        print(NostrumConstants.vote_time_list[i-1], ":", client.get_votes_time(i), "votes")
    print("-------------")
    print("Burn rate:")
    for i in range(1, 6):
        print(NostrumConstants.burn_rate_list[i-1], ":", client.get_votes_burn(i), "votes")
    print("-------------")
    print("Stack earning:")
    for i in range(1, 6):
        print(NostrumConstants.stack_earn_list[i-1], ": ", client.get_votes_stack(i), "votes")
    print("-------------")

def get_user_fees():
    print("-------------")
    print("Set your fees.") 
    print("IMPORTANT !!!")
    print("Make sure you know what you are doing otherwise you can have problems with your transaction")
    gas_used = input("Set the max gas (default: 300000):")
    max_fee = input("Set max fee/gas in nAVAX (default: 30):")
    gas_used = int(gas_used)
    max_fee = int(max_fee)
    print("New fees:")
    print("Gas:", gas_used)
    print("Max fee/gas", max_fee)
    print("-------------")
    return gas_used, max_fee

def vote_process(nostrum_wallet : NostrumWallet):
    print("\n")
    print("==== Vote ====")
    print("Note: you can vote \'null\' choosing option 0")
    print("--- Vote for next election time ---")
    for i in range(1, 6):
        print(i, "-", NostrumConstants.vote_time_list[i-1])
    vote_id = input("Choose one option:")
    vote_id = int(vote_id)
    if vote_id == 0:
        print("You choose vote null for next election time (your vote will be ignored)")
    else:
        print("Your vote:",  NostrumConstants.vote_time_list[vote_id-1])
    print("-------------")
    print("--- Vote for next burn rate ---")
    for i in range(1, 6):
        print(i, "-", NostrumConstants.burn_rate_list[i-1])
    vote_id_br = input("Choose one option:")
    vote_id_br = int(vote_id_br)
    if vote_id_br == 0:
        print("You choose vote null for next burn rate (your vote will be ignored)")
    else:
        print("Your vote:",  NostrumConstants.burn_rate_list[vote_id_br-1])
    print("-------------")
    print("--- Vote for next staking percentage APR ---")
    for i in range(1, 6):
        print(i, "-", NostrumConstants.stack_earn_list[i-1])
    vote_id_sp = input("Choose one option:")
    vote_id_sp = int(vote_id_sp)
    if vote_id_sp == 0:
        print("You choose vote null for next burn rate (your vote will be ignored)")
    else:
        print("Your vote:",  NostrumConstants.stack_earn_list[vote_id_sp-1])
    print("-------------")
    print("Finish your vote")
    print("1. Done! Send vote transaction! (default fees: 300000 gas, 30 nAVAX max fee/gas)")
    print("2. Set fees for Avax network")
    finish_op = input("Choose one option:")
    finish_op = int(finish_op)
    if finish_op == 1:
        return nostrum_wallet.vote(vote_id, vote_id_br, vote_id_sp)
    elif finish_op == 2:
        user_gas, user_fee = get_user_fees()
        print("1. Done! Send vote transaction using new fees")
        finish_op = input("Choose one option:")
        finish_op = int(finish_op)
        if finish_op == 1:
            return nostrum_wallet.vote(vote_id, vote_id_br, vote_id_sp, gas=user_gas, gasPrice=user_fee)
    return None

def stake_process(nostrum_wallet : NostrumWallet):
    print("\n")
    print("==== Stake ====")
    print("You have", nostrum_wallet.get_nostrum_balance(), "Nostrum in your wallet")
    print("You have", nostrum_wallet.stacked_value(), "Nostrum staked")
    print("IMPORTANT!!! After you stack you can only stack again after you unstake everything")
    stake_value = input("How much do you want to stake? (use \'.\' for decimal):")
    stake_value = float(stake_value)
    print("1. Stake", stake_value, "! Send stake transaction! (default fees: 300000 gas, 30 nAVAX max fee/gas)")
    print("2. Set fees for Avax network")
    finish_op = input("Choose one option:")
    finish_op = int(finish_op)
    if finish_op == 1:
        return nostrum_wallet.stake(stake_value)
    elif finish_op == 2:
        user_gas, user_fee = get_user_fees()
        print("1. Done! Send stake transaction using new fees")
        finish_op = input("Choose one option:")
        finish_op = int(finish_op)
        if finish_op == 1:
            return nostrum_wallet.stake(stake_value, gas=user_gas, gasPrice=user_fee)
    return None

def unstake_process(nostrum_wallet : NostrumWallet):
    print("\n")
    print("==== UnStake ====")
    print("You have", nostrum_wallet.get_nostrum_balance(), "Nostrum in your wallet")
    print("You have", nostrum_wallet.stacked_value(), "Nostrum staked")
    unstake_value = input("How much do you want to unstake? (use \'.\' for decimal):")
    unstake_value = float(unstake_value)
    print("1. UnStake", unstake_value, "! Send unstake transaction! (default fees: 300000 gas, 30 nAVAX max fee/gas)")
    print("2. Set fees for Avax network")
    finish_op = input("Choose one option:")
    finish_op = int(finish_op)
    if finish_op == 1:
        return nostrum_wallet.unstake(unstake_value)
    elif finish_op == 2:
        user_gas, user_fee = get_user_fees()
        print("1. Done! Send unstake transaction using new fees")
        finish_op = input("Choose one option:")
        finish_op = int(finish_op)
        if finish_op == 1:
            return nostrum_wallet.unstake(unstake_value, gas=user_gas, gasPrice=user_fee)
    return None

def main():
    wallet = get_wallet()
    nostrumWallet = NostrumWallet(wallet_adress=wallet)
    
    while True:
        try:

            option = print_menu(nostrumWallet)

            if option == 0:
                private_key = get_private_key()
                nostrumWallet.set_private_key(private_key)
            
            elif option == 1:
                print_election_stats(nostrumWallet.client)
            
            elif option == 2 and nostrumWallet.private_key != None:
                if not nostrumWallet.voted():
                    tx_vote = vote_process(nostrumWallet)
                    if tx_vote == None:
                        print("There was a problem with your vote")
                    else:
                        print("Vote transaction sent !!!")
                        print("Check transaction in: ", AVAX_EXPLORER+"/tx/0x"+str(tx_vote))
                        print("Thanks for your vote")
                else:
                    print("You already voted in the current election!")
            
            elif option == 3 and nostrumWallet.private_key != None:
                if nostrumWallet.stacked_value() <= 0:
                    tx_stake = stake_process(nostrumWallet)
                    if tx_stake == None:
                        print("There was a problem in your stake process")
                    else:
                        print("Stake transaction sent !!!")
                        print("Check transaction in: ", AVAX_EXPLORER+"/tx/0x"+str(tx_stake))
                        print("It may take a while for the network to confirm your stake")
                else:
                    print("You need to unstake your Nostrum in order to stake again")
            
            elif option == 4 and nostrumWallet.private_key != None:
                if nostrumWallet.stacked_value() > 0:
                    tx_unstake = unstake_process(nostrumWallet)
                    if tx_unstake == None:
                        print("There was a problem in your unstake process")
                    else:
                        print("Unstake transaction sent !!!")
                        print("Check transaction in: ", AVAX_EXPLORER+"/tx/0x"+str(tx_unstake))
                        print("It may take a while for the network to confirm your unstake")
                else:
                    print("You do not have Nostrum staked")
            else:
                pass

        except Exception as e:
            logger.error(e)
            print(e)
            sys.exit()

if __name__ == '__main__':
    main()