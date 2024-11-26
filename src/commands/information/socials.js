const { Command, container } = require('@sapphire/framework');
const { userMention } = require('discord.js');

const { Socials } = require('../../lib/constants');

class socialsCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'socials',
			// Configuration for the command
			enabled: container.commandsConfig.socials.enabled || false,
			description: container.commandsConfig.socials.description || 'Description not provided.',
			runIn: container.commandsConfig.socials.runIn || 'GUILD_TEXT',
			cooldownDelay: container.commandsConfig.socials.cooldownDelay || 10,
			preconditions: container.commandsConfig.socials.preconditions || [],
			requiredUserPermissions: container.commandsConfig.socials.requiredUserPermissions || []
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) =>
					option //
						.setName('resource')
						.setDescription('What would would you like to link?')
						.setRequired(true)
						.addChoices(
							{ name: 'GitHub', value: Socials['GitHub'] },
							{ name: 'Twitter', value: Socials['Twitter'] },
							{ name: 'Reddit', value: Socials['Reddit'] },
							{ name: 'Website', value: Socials['Website'] },
							{ name: 'Email', value: Socials['Email'] },
							{ name: 'Store', value: Socials['Store'] },
							{ name: 'Discord', value: Socials['Discord'] },
							{ name: 'Documentation', value: Socials['Documentation'] }
						)
				)
				.addUserOption((option) =>
					option //
						.setName('mention')
						.setDescription('The user you would like to mention, if applicable.')
						.setRequired(false)
				)
		);
	}

	async chatInputRun(interaction) {
		let replyContent;

		const user = interaction.options.getUser('user');
		const resource = interaction.options.getString('resource');

		return interaction.reply({
			content: `${resource} ${user ? userMention(user.id) : ''}`,
			ephermal: container.commandsConfig.configEdit.ephemeral || false
		});
	}
}

module.exports = {
	socialsCommand
};
