const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a list of all commands'),
	async execute(interaction) {
        await interaction.deferReply();
		// Reply with a list of all commands
        const commands = interaction.client.commands;
        let commandsArray = [];
        // console.log(commands);
        commands.forEach(command => {
            // console.log(command);
            commandsArray.push(`\`${command.data.name}\`: ${command.data.description}`);
        });

        await interaction.editReply("List of commands:\n" + commandsArray.join("\n"));
	},
};