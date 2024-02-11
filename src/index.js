require('dotenv').config()

const {Telegraf} = require("telegraf")
const { message } = require("telegraf/filters")

// module imports
const menu = require('./modules/menus')
const auth = require('./modules/auth')
const token = require('./modules/token')

// initiate connection to bot
const bot = new Telegraf(process.env.TELEGRAM_API)

// start up bot
bot.start( async ctx => {

    const user = ctx.from.username
    const fullName = ctx.from.first_name
    console.log(`${user} sent a message`)

    await auth.connect(user)
    
    ctx.reply(`Hi ${fullName}, welcome to Noob Ape Bot. Let's onboard you to the crazy world of Degen Trading on the Solana chain \n ${menu.help()}`)
})
bot.help( async ctx => {
    ctx.reply("Hello chad, Check out the help menu below to find a solution to your request")
    ctx.reply(menu.help())
})
bot.hears('hi', ctx => ctx.reply("Hello chad, Click /start if you're ready to get onboarded to the world of degen trading"))

// create and listen to commands
bot.command("start", async ctx => {
    ctx.reply("This is a great start, let's get you started")
})


// chec user input for contract address
bot.on('message', async ctx => {
    if (typeof ctx.update.message.text !== 'u   ndefined') {
        try {
            const input = await ctx.update.message.text

            const info = await token.lookup(await input)

            ctx.reply(`Token being Analyzed: ${input}`)
            // console.log(formattedMessage)
            console.log(info)

            const message = `
*Name:* ${info.token.name}
*Ticker:* ${info.token.symbol}
*Contract Address:* ${info.token.address}

*Chain:* ${info.chain}
*DEX:* ${info.dex}
*Price:* $${info.price}
*FDV:* $${Number(info.fdv).toLocaleString()}
*Liquidity:* $${Number(info.liquidity).toLocaleString()}

*Dex Screener Link:* ${info.dexScreenerUrl}
            `;

            ctx.reply(await message, { parse_mode: 'Markdown' })
        }
        catch (error) {
            console.error(error); // Log the actual error
        
            if (error.message.includes('text property')) {
              ctx.reply('Sorry, I can only process text messages');
            } 
            else {
              ctx.reply('An error occurred, please try again later.');
            }
        }
    }
})

bot.launch()