module.exports = {
    name: `checkgban`,
    description: `Helps a user`,
    options: [
        {
            name: "action",
            description: "The type of animal",
            type: 3,
            required: true,
            choices: [
                {
                    name: `check`,
                    value: `check`
                },
                {
                    name: `dontcheck`,
                    value: `dontcheck`
                }
            ]
        },
       ],
    callback: async (client, interaction, args, author, createAPIMessage) => {
        owners = ["535375983411462154", "575625240588320798"]
        const action = args.find(arg => arg.name.toLowerCase() == `action`).value
		if (owners.includes(author.id)) {
            if (action === `check`) {
          
                const embed = new Discord.MessageEmbed()
                    .setTitle(`soon`)
                    .setColor(`#2f3136`)
                    .setDescription("soon")
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
            if (action === `dontcheck`) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Ok!`)
                    .setColor(`#2f3136`)
                    .setDescription(`Dzięki za korzystanie z bota :)!`)
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
                .setDescription(`Tryb developerski jest online nie możesz tego wykonać!`)
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
