const axios = require('axios')

class Token {

    async lookup (contract) {

        const url = `https://api.dexscreener.com/latest/dex/search/?q=${contract}` 
        let response = ""

        try {
            const {data} = await axios.get(url)
            const res = await data.pairs[0]
            // console.log(res)
            
            const baseTkn = await res.baseToken

            // console.log(res.volume)

            const details = {
                chain: res.chainId,
                dex: res.dexId,
                dexScreenerUrl: res.url,
                pairAddress: res.pairAddress,
                price: res.priceUsd,
                fdv: res.fdv,
                // trxs: res.txns,
                // vol: res.volume,
                liquidity: res.liquidity.usd,

                token: {
                    address: baseTkn.address,
                    name: baseTkn.name,
                    symbol: baseTkn.symbol
                },

            }
            
            console.log(await details)
            return await details
            
        } catch (error) {
            console.log("E no e fetch", error)
            throw new Error("Could not fetch token data")
        }
        
    }
    
}

const token = new Token
module.exports = token