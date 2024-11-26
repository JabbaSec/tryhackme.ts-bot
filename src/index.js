require('./lib/setup');

const { LogLevel, SapphireClient, container } = require('@sapphire/framework');
const { GatewayIntentBits, Partials } = require('discord.js');
const { PrismaClient } = require('@prisma/client');
const { CustomLogger } = require('./lib/logger');
const { commands } = require('./config.json');

const client = new SapphireClient({
	caseInsensitiveCommands: true,
	logger: {
		instance: new CustomLogger(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)
	},
	shards: 'auto',
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel],
	loadMessageCommandListeners: true
});

const main = async () => {
	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL
			}
		}
	});

	try {
		await prisma.$connect();
		client.logger.info('Database connected successfully.');
		container.prisma = prisma;
	} catch (error) {
		client.logger.error('Failed to connect to the database:', error);
		process.exit(1); // Exit the process on failure
	}

	container.commandsConfig = commands;

	try {
		client.logger.info('Logging in');
		await client.login(process.env.DISCORD_TOKEN);
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
