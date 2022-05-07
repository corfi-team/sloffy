module.exports = async () => {
    const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`))

    // const commands = await client.api.applications(client.user.id).commands.get()
    // commands.forEach(cmd => {
    //     client.api.applications(client.user.id).commands(cmd.id).delete()
    // })

    // setTimeout(() => {
    for (const file of commandFiles) {
        const commandfile = require(`./commands/${file}`)
        client.api.applications(client.user.id).commands.post({
            data: {
                name: commandfile.name,
                description: commandfile.description,
                options: commandfile.options
            }
        })
    }
    // }, 1000)

    client.ws.on(`INTERACTION_CREATE`, async interaction => {
        if (!interaction.data.name) return
        const command = interaction.data.name.toLowerCase()
        const args = interaction.data.options
        const author = client.users.cache.get(interaction.member.user.id)
        for (const file of commandFiles) {
            const commandfile = require(`./commands/${file}`)
            if (command === commandfile.name) {
                commandfile.callback(client, interaction, args, author, createAPIMessage)
            }
        }
    })

    async function createAPIMessage(interaction, content) {
        const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles()
        return {...apiMessage.data, files: apiMessage.files}
    }
}