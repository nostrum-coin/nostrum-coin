class NostrumConstants:
    vote_time_list = ["1 week", "4 weeks", "8 weeks", "26 weeks", "52 weeks"]
    burn_rate_list = ["0%", "0.1%", "0.5%", "1%", "2%"]
    stack_earn_list = ["0%", "1%", "3%", "5%", "10%"]

    avax_net = "https://api.avax.network/ext/bc/C/rpc"
    contract_address = "0x1C4B61d0Be6A061eA844cc0619D6887ba0f1Dc5b"
    chain_id = 43114
    digit_divisor = 10 ** 18

    @staticmethod
    def burn_to_str(burn_rate):
        return str(burn_rate / 1000.0) + "%"

    @staticmethod
    def dailyTax_to_str(dailyTax):
        if dailyTax == 0:
            return "0%"
        elif dailyTax == 3:
            return "1%"
        elif dailyTax == 8:
            return "3%"
        elif dailyTax == 13:
            return "5%"
        elif dailyTax == 28:
            return "10%"
        return None

    def voteTime_to_str(voteTime):
        return str(voteTime) + " seconds (" + str(int(voteTime/604800)) + " weeks)"