class Menu {
    help(){
        return (`
            \n/help The complete help menu
            \n/account View and manage your account
            \n/fund Deposit funds to your account
            \n/positions Check all open positions
        `)
    }
}

const menu = new Menu()
module.exports = menu