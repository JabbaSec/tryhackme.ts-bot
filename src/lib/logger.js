const { Logger } = require('@sapphire/plugin-logger');
const { LogLevel } = require('@sapphire/framework');
const { WebhookClient, EmbedBuilder } = require('discord.js');

const { logging } = require('../config.json');

class CustomLogger extends Logger {
	constructor(webhookId, webhookToken) {
		super(); // Initialize the base logger
		this.webhookClient = new WebhookClient({
			id: webhookId,
			token: webhookToken
		});

		this.logColors = {
			Fatal: 0xd32f2f, // Rich Red
			Error: 0xf57c00, // Vibrant Orange
			Warn: 0xffeb3b, // Bright Yellow
			Info: 0x4caf50, // Fresh Green
			Debug: 0x2196f3 // Bright Blue
		};

		this.level = LogLevel[logging['consoleLevel']];
	}

	// Override the log method
	write(level, ...values) {
		// Call the parent class method to log to the console
		super.write(level, ...values);

		// Format the log level and message
		const levelName = LogLevel[level] || 'Unknown';
		const message = values.join(' ');

		if (level < LogLevel[logging['discordLevel']]) {
			return;
		}

		// Create an embed for the log message
		const embed = new EmbedBuilder()
			.setTitle(levelName)
			.setDescription(message)
			.setColor(this.logColors[levelName] || 0x808080) // Default to grey if level not mapped
			.setTimestamp();

		// Send the embed via the webhook
		this.webhookClient
			.send({
				embeds: [embed], // Send embed as an array
				username: 'Loggs',
				avatarURL: 'https://www.pngmart.com/files/11/Firewood-Sacked-PNG-HD.png' // Optional: Set a custom avatar for the webhook
			})
			.catch(console.error); // Catch errors to avoid crashes
	}
}

module.exports = { CustomLogger };
