module.exports = {
    name: `eval`,
    description: `Eval a Javascript code`,
    options: [
        {
            name: `code`,
            description: `Javascript code to eval`,
            type: 3,
            required: true
        }
    ],
    callback: async (client, interaction, args, author, createAPIMessage) => {
        owners = ["535375983411462154", "575625240588320798"]
        const code = args.find(arg => arg.name.toLowerCase() == `code`).value
        if (owners.includes(author.id)) {
            try {
                output = await eval(code)
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Eval`)
                    .setColor(`#2f3136`)
                    .setDescription(e)
                    .setFooter(`${author.tag} (${author.id})`, author.displayAvatarURL({dynamic: true}))
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 5,
                    }
                })
                client.api.webhooks(client.user.id, interaction.token).messages(`@original`).patch({
                    data: await createAPIMessage(interaction, embed)
                })
                return
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .setColor(`#2f3136`)
                .setDescription(output)
                .setFooter(`${author.tag} (${author.id})`, author.displayAvatarURL({dynamic: true}))
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5,
                }
            })
            client.api.webhooks(client.user.id, interaction.token).messages(`@original`).patch({
                data: await createAPIMessage(interaction, embed)
            })
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Błąd!`)
                .setColor(`#2f3136`)
                .setDescription(`Nie posiadasz uprawnień!`)
                .setFooter(`${author.tag} (${author.id})`, author.displayAvatarURL({dynamic: true}))
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5,
                }
            })
            client.api.webhooks(client.user.id, interaction.token).messages(`@original`).patch({
                data: await createAPIMessage(interaction, embed)
            })
        }
    }
}