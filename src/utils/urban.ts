import ud from 'urban-dictionary'

export const define: (word: string) => Promise<ud.DefinitionObject | null> = async (word: string) => {
    return ud.define(word).then((results) => {
        const definition = results[0]
        console.log(definition)
        return definition
    }).catch((error) => {
        return null
    })
}