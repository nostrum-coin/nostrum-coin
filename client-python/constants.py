class NostrumConstants:
    vote_time_list = ["1 week", "4 weeks", "8 weeks", "26 weeks", "52 weeks"]
    burn_rate_list = ["0%", "0.1%", "0.5%", "1%", "2%"]
    stack_earn_list = ["0%", "1%", "3%", "5%", "10%"]

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