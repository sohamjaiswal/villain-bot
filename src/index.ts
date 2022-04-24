
import dotenv from "dotenv"

import { Client } from "guilded.js"
import { DefinitionObject } from "urban-dictionary"
import { uploadImage } from "./utils/image-upload"
import { define } from "./utils/urban"
import { gibQuote } from './utils/quote';


dotenv.config()

const token = process.env.token
const prefix = process.env.prefix


if (token && prefix) {
    const client = new Client({ token: token });
    client.on("ready", () => console.log(`Bot is successfully logged in`));
    try {
        client.on("messageCreated", async (message) => {
        if (message.createdByBotId) return
        if (message.content === "test") {
            return message.reply("test indeed");
        }
        if (message.content.startsWith(prefix)) {
            const [commandName, ...args] = message.content.slice(prefix.length).split(" ");
            switch (commandName) {
                case "image": {
                    uploadImage('lol.jpg').then(async (upload) => {
                        if (upload) {
                            await message.send(upload)
                        } else {
                            await message.send('Something broke... D:')
                        }
                    })
                    break
                    }
                case "help" : {
                    await message.send(`Yo! \n ***TooMuchHam*** made me! \n Ask him about my features as I am in active dev.`)
                    break
                }
                case "urban" : {
                    const words = [args].join(" ")
                    const definition: DefinitionObject | null = await define(words)
                    if (definition) {
                        const msgContent: string = `word: ${definition.word} \n definition: ${definition.definition}`
                        await message.send(msgContent)
                    } else {
                        await message.send("Oof! I tried, but couldn't get the meaning...")
                    }
                    break
                }
                case "invite" : {
                    await message.reply("Here is my invite link! \n https://www.guilded.gg/b/35d4f270-489b-4088-9c9c-dc1e3f986ede")
                    break
                }
                case "rant": {
                    await message.reply("ham good, haters idiots")
                    break
                }
                case "shrug": {
                    await message.reply("¯\\_(ツ)_/¯")
                    break
                }
                case "hi": {
                    await message.reply("Hi awesome person, hope you enjoy!")
                    break
                }
                case "quote": {
                    const quote = (gibQuote(args).then(async (data: any) => { 
                        const messageData = `Anime: ${data.anime}\nCharacter: ${data.character}\nQuote:\n${data.quote}`
                        await message.reply(messageData)
                    }))
                    break
                }
            }
        }
    });
    } catch {
        console.log('an err occured')
    }
    client.login()
} else {
    console.error("Please put token & prefix in a .env file at project root.")
}