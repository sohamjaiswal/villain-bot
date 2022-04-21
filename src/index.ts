
import dotenv from "dotenv"

import {Client} from "guilded.js"
import { DefinitionObject } from "urban-dictionary"
import {uploadImage} from "./utils/image-upload"
import { define } from "./utils/urban"


dotenv.config()

const token = process.env.token
const prefix = process.env.prefix


if (token && prefix) {
    const client = new Client({token: token});
    
    client.on("ready", () => console.log(`Bot is successfully logged in`));
    client.on("messageCreated", async (message) => {
        if (message.createdByBotId) return
        if (message.content === "test") {
            return message.reply("test indeed");
        }
        const [commandName, ...args] = message.content.slice(prefix.length).split(" ");
        switch (commandName) {
            // case "image": {
            //     uploadImage('2000.jpg').then((res) => res)
            //     break
            //     }
            // case "static": {
            //     await message.send("https://s3-us-west-2.amazonaws.com/www.guilded.gg/ContentMedia/7ea74857963de8735850cfb51cc9d0d4-Full.webp?w=680&h=933")
            //     break
            // }
            case "help" : {
                await message.send("Yo! \n TooMuchHam made me! \n Ask him about my features as I am in active dev.")
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

        }

    });

    client.login()
} else {
    console.error("Please put token & prefix in a .env file at project root.")
}