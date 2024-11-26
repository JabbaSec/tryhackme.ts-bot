const { Command, container } = require('@sapphire/framework');
const { Subcommand } = require('@sapphire/plugin-subcommands');
const { editConfigValue } = require('../../lib/utils');

class configCommand extends Subcommand {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'config',
			// Configuration for the command,
			enabled: container.commandsConfig.config.enabled || false,
			description: container.commandsConfig.config.description || 'Description not provided.',
			runIn: container.commandsConfig.config.runIn || 'GUILD_TEXT',
			cooldownDelay: container.commandsConfig.config.cooldownDelay || 10,
			preconditions: container.commandsConfig.config.preconditions || [],
			requiredUserPermissions: container.commandsConfig.config.requiredUserPermissions || [],
			// Subcommands
			subcommands: [
				{ name: 'edit', chatInputRun: 'chatInputRunEdit' },
				{ name: 'get', chatInputRun: 'chatInputRunView' },
				{ name: 'reset', chatInputRun: 'chatInputRunReset' },
				{ name: 'list', chatInputRun: 'chatInputRunList' },
				{ name: 'delete', chatInputRun: 'chatInputRunDelete' },
				{ name: 'add', chatInputRun: 'chatInputRunAdd' }
			]
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				// Subcommands
				.addSubcommand((subcommand) =>
					subcommand
						.setName('edit')
						.setDescription('Edit the value of a key from the config.')
						.addStringOption((option) => option.setName('key').setDescription('The key to edit the value of.').setRequired(true))
						.addStringOption((option) => option.setName('value').setDescription('The value to set the key to.').setRequired(true))
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('get')
						.setDescription('Get the value of a key from the config.')
						.addStringOption((option) => option.setName('key').setDescription('The key to get the value of.').setRequired(true))
				)
				.addSubcommand((subcommand) => subcommand.setName('reset').setDescription('Reset the config to the default values.'))
				.addSubcommand((subcommand) =>
					subcommand
						.setName('list')
						.setDescription('List all child keys.')
						.addStringOption((option) => option.setName('key').setDescription('The key to get the child keys of.').setRequired(true))
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('delete')
						.setDescription('Delete a key from the config.')
						.addStringOption((option) => option.setName('key').setDescription('The key to delete').setRequired(true))
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName('add')
						.setDescription('Add a key to the config.')
						.addStringOption((option) => option.setName('key').setDescription('The key name to add.').setRequired(true))
						.addStringOption((option) => option.setName('value').setDescription('The value to set the key to.').setRequired(true))
				)
		);
	}

	async chatInputRunEdit(interaction) {
		const key = interaction.options.getString('key');
		const value = interaction.options.getString('value');

		if (editConfigValue(key, value) != true) {
			return interaction.reply({
				content: `There was an error!`
			});
		}

		return interaction.reply({
			content: `Variable updated and bot restarted!`,
			ephermal: container.commandsConfig.config.ephemeral || false
		});
	}
}

module.exports = {
	configCommand
};
