const express = require('express')
require('dotenv').config()

const {Telegraf} = require("telegraf")

// import of menus
const menu = require('./menus')

// global variables
const app = express()
const route = express.Router

// initiate connection to bot
const bot = new Telegraf(process.env.TELEGRAM_API)

// start up bot
bot.start( async ctx => {
    ctx.reply("Hi, welcome to Noob Bot. Let's onboard you to the crazy world of Degen Trading on the Solana chain")

    ctx.reply(menu.help)
})
bot.help( async ctx => {
    ctx.reply("Hello chad, what would you like me to help you with? \nCheck the options below to find out what you want me to help you with")
    // ctx.reply(menu.help)
})
bot.hears('hi', ctx => ctx.reply("Hello chad, Click /start if you're ready to get onboarded to the world of degen trading"))

// create and listen to commands
bot.command("start", async ctx => {
    ctx.reply("This is a great start, let's get you started")
})

bot.launch()