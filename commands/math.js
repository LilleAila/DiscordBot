const { SlashCommandBuilder } = require('@discordjs/builders');
const math = require('mathjs');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Do math')
        .addSubcommand(subcommand =>
            subcommand
                .setName('simple')
                .setDescription('Simple arithmetic math and unit conversions')
                .addStringOption(option => option.setName('math').setDescription('Problem').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('simplify')
                .setDescription('Simplify algebraic expression')
                .addStringOption(option => option.setName('math').setDescription('Expression').setRequired(true))),
	async execute(interaction) {
            await interaction.deferReply();

            let question = interaction.options.getString('math');
            let answer;

            try {
                switch(interaction.options.getSubcommand()) {
                    case 'simple':
                        answer = math.evaluate(question);
                        break;
                    case 'simplify':
                        answer = math.simplify(question);
                        break;
                }
            } catch(error) {
                await interaction.editReply(`There was an error calculating ${question}: \`${error}\``);
                return;
            }

            await interaction.editReply(`The answer to \`${question}\` is \`${answer}\``);
	},
};
