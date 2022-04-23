import fetch from 'node-fetch'
export const gibQuote = async (args: string[]) => {
    switch (args[0]) {
        case 'random': 
            return await fetch('https://animechan.vercel.app/api/random')
                .then(response => response.json())
                .then(quote => quote)
        default:
            return await fetch('https://animechan.vercel.app/api/random')
                .then(response => response.json())
                .then(quote => quote)
    }
}