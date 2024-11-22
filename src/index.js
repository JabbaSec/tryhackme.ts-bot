require('./lib/setup');

const { LogLevel, SapphireClient, container } = require('@sapphire/framework');
const { prefix, discord_token, database_url } = require('./config.json');
const { GatewayIntentBits, Partials } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

const client = new SapphireClient({
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
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
				url: database_url
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

	try {
		client.logger.info('Logging in');
		await client.login(discord_token);
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
