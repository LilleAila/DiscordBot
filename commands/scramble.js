const { SlashCommandBuilder } = require('@discordjs/builders');
const cube = require("scrambler-util");

const events = {
    'bld': 'blindfolded',
    'fmc': 'fewest moves',
    'oh': 'one handed'
},
numbers = ['Zero', 'One', 'Two', 'Three', 'Four'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scramble')
		.setDescription('Generate a random WCA-scramble for a cube')
        .addStringOption(option =>
            option.setName('cube')
                .setDescription('Cube Type')
                .addChoice('1x1', '1x1')
                .addChoice('2x2', '2x2')
                .addChoice('3x3', '3x3')
                .addChoice('4x4', '4x4')
                .addChoice('5x5', '5x5')
                .addChoice('6x6', '6x6')
                .addChoice('7x7', '7x7')
                .addChoice('2x2x3', '2x2x3')
                .addChoice('Skewb', 'skewb')
                .addChoice('Pyraminx', 'pyraminx')
                .addChoice('Square-1', 'sq1')
                .addChoice('Clock', 'clock')
                .addChoice('Redi Cube', 'redi')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('How many scrambles to return')
                .addChoice('One', 1)
                .addChoice('Two', 2)
                .addChoice('Three', 3)
                .addChoice('Four', 4)
                .setRequired(false))
        .addStringOption(option =>
            option.setName('event')
                .setDescription('Solve event')
                .addChoice('Normal', 'none')
                .addChoice('Blindfolded', 'bld')
                .addChoice('Fewest Moves', 'fmc')
                .addChoice('One Handed', 'oh')
                .setRequired(false)),
	async execute(interaction) {
        await interaction.deferReply();

        const cubeType = interaction.options.getString('cube') || '3x3';
        const count = interaction.options.getInteger('count') || 1;
        const event = interaction.options.getString('event') || 'none';

        const scrambles = cube(cubeType, count, event);

        const message = `${numbers[parseInt(count)]} ${event !== 'none' ? `${events[event]} ` : ''}scramble${count > 1 ? 's' : ''} for \`${cubeType == 'sq1' ? 'square-1' : cubeType}\`:\n\`${scrambles.join('\`\n\n\`')}\``;

        await interaction.editReply(message);
	},
};