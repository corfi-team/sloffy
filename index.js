global.Discord = require(`discord.js`)
global.client = new Discord.Client()
global.fs = require(`fs`)
global.db = require(`quick.db`)

client.on(`ready`, async () => {
    console.log(`Logged in as ${client.user.tag}`)
    require(`./command.handler`)()
    // const commands = await client.api.applications(client.user.id).commands.get()
    // console.log(commands)
    // commands.forEach(cmd => {
    //     client.api.applications(client.user.id).commands(cmd.id).delete()
    //     console.log(cmd)
    // })

})


client.login(`ODI1ODA4NDcwOTU5NzE4NDYx.YGDUEg.LqLBb5V3b6tqkCK22e6SJvaR2Dk`)