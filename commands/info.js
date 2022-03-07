const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
	async execute(interaction) {
        await interaction.deferReply();
        switch(interaction.options.getSubcommand()) {
            case "server":
                await interaction.editReply(`Server name: \`${interaction.guild.name}\`\nTotal members: \`${interaction.guild.memberCount}\``);
                break;
            case "user":
                let userId = interaction.options.getUser('target').id || interaction.user.id;
                const user = interaction.client.users.cache.find(user => user.id === userId);
                await interaction.editReply(`User tag: \`${user.tag}\`\nUser id: \`${user.id}\``);
                break;
        }
	},
};