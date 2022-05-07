module.exports = {
    name: `gban`,
    description: `Gbans a user`,
    options: [
        {
            name: "action",
            description: "The type of animal",
            type: 3,
            required: true,
            choices: [
                {
                    name: `add`,
                    value: `add`
                },
                {
                    name: `remove`,
                    value: `remove`
                }
            ]
        },
        {
            name: `id`,
            description: `User id to gban`,
            type: 3,
            required: true
        },
        {
            name: `reason`,
            description: `Reason of gban`,
            type: 3,
            required: true
        }
    ],
    callback: async (client, interaction, args, author, createAPIMessage) => {
        owners = ["535375983411462154", "575625240588320798"]
        const action = args.find(arg => arg.name.toLowerCase() == `action`).value
        const id = args.find(arg => arg.name.toLowerCase() == `id`).value
        const reason = args.find(arg => arg.name.toLowerCase() == `reason`).value
        if (owners.includes(author.id)) {
            if (action === `add`) {
                db.delete(id)
                db.set(`${id}.gbancheck`, true)
                db.set(`${id}.gbanreason`, reason)
                const user = client.users.cache.get(id) || `użytkownika z id \`${id}\``
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Sukces!`)
                    .setColor(`#2f3136`)
                    .setDescription(`Globalnie zbanowano ${user} z powodem \`${reason}\`!`)
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
            if (action === `remove`) {
                db.delete(id)
                const user = client.users.cache.get(id) || `użytkownika z id \`${id}\``
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Sukces!`)
                    .setColor(`#2f3136`)
                    .setDescription(`Globalnie odbanowano ${user}!`)
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